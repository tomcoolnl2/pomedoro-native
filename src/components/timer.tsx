
import React from 'react'
import { View, StyleSheet, Vibration } from 'react-native'
import { ProgressBar, Text } from 'react-native-paper'
import { Audio } from 'expo-av'
import { useKeepAwake } from 'expo-keep-awake'
import { VIBRATION_PATTERN } from '../utils'
import { Theme } from '../theme'
import { Button, Countdown, TimerOptions } from './'
import alarmMp3 from '../../assets/alarm.mp3';


interface Props {
    subject: string
    clearSubject: () => void
    onTimerEnd: () => void
}

export const Timer: React.FC<Props> = ({ subject, clearSubject, onTimerEnd }) => {
  
    useKeepAwake()

    const [ minutes, setMinutes ] = React.useState<number>(0.1)
    const [ isStarted, setIsStarted ] = React.useState<boolean>(false)
    const [ pauseCounter, setPauseCounter ] = React.useState<number>(0)
    const [ progress, setProgress ] = React.useState<number>(1)
    const [ sound, setSound ] = React.useState<Audio.Sound>(null)
    const [ soundIsPlaying, setSoundIsPlaying ] = React.useState<boolean>(false)
 
    const playSound = React.useCallback(async () => {
        const { sound } = await Audio.Sound.createAsync(alarmMp3);
        setSound(sound)
        sound.stopAsync()
        setSoundIsPlaying(true)
        await sound.playAsync()
    }, []);

    const stopSound = React.useCallback(async () => {
        setSoundIsPlaying(false)
        sound.stopAsync()
    }, [sound])

    React.useEffect(() => {
        return sound
            ? () => { sound.unloadAsync() }
            : undefined
    }, [])

    const onProgress = React.useCallback((progress: number) => {
        setProgress(progress / 100)
    }, [])

    const onPause = React.useCallback(() => {
        setPauseCounter(pauseCounter + 1)
    }, [pauseCounter])

    const onEnd = React.useCallback(async () => {
        try {
            await playSound()
            Vibration.vibrate(VIBRATION_PATTERN)
        } catch (error) {
            console.log(error)
        }

        setProgress(1)
        setIsStarted(false)
        setMinutes(20)
        onTimerEnd()
    }, [])

    const changeTime = React.useCallback((min: number) => {
        setProgress(1)
        setIsStarted(false)
        setMinutes(min)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onPause={onPause}
                    onEnd={onEnd}
                    onProgress={onProgress}
                />
                <View style={styles.currentSubject}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.text}>{subject}</Text>
                </View>
            </View>
            <View>
                <ProgressBar
                    progress={progress}
                    color={Theme.color.firebrick}
                    style={styles.progress}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <TimerOptions changeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button title={!isStarted ? 'Start' : 'Pause'} onPressHandler={() => setIsStarted(!isStarted)} />
            </View>
            <View style={styles.clearSubject}>
                <Button title='-' size={50} onPressHandler={clearSubject} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    countdown: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: Theme.title,
    text: Theme.text,
    currentSubject: { 
        padding: Theme.size.xxl
    },
    progress: { 
        height: Theme.size.sm
    },
    buttonWrapper: {
        flexDirection: 'row',
        flex: .3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.size.md,
    },
    clearSubject: {
        paddingBottom: Theme.size.lg,
        paddingLeft: Theme.size.lg
    },
})
