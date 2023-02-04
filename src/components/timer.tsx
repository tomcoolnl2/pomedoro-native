
import React from 'react'
import { View, StyleSheet, Vibration } from 'react-native'
import { ProgressBar, Text } from 'react-native-paper'
import { Audio } from 'expo-av'
import { useKeepAwake } from 'expo-keep-awake'
// import { bellSound } from '../../assets/bell.mp3';
import { VIBRATION_PATTERN } from '../utils'
import { Theme } from '../theme'
import { Button, Countdown, TimerOptions } from './'


interface Props {
    subject: string
    clearSubject: () => void
    onTimerEnd: () => void
}

export const Timer: React.FC<Props> = ({ subject, clearSubject, onTimerEnd }) => {
  
    useKeepAwake()
  
    // const soundObject = new Audio.Sound()

    const [ minutes, setMinutes ] = React.useState<number>(0.1)
    const [ isStarted, setIsStarted ] = React.useState<boolean>(false)
    const [ pauseCounter, setPauseCounter ] = React.useState<number>(0)
    const [ progress, setProgress ] = React.useState<number>(1)

    const onProgress = React.useCallback((progress: number) => {
        setProgress(progress / 100)
    }, [])

    const onPause = React.useCallback(() => {
        setPauseCounter(pauseCounter + 1)
    }, [pauseCounter])

    const onEnd = React.useCallback(async () => {
        try {
            // await soundObject.loadAsync(bellSound)
            // await soundObject.playAsync()
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

    // React.useEffect(() => {
    //     return () => {
    //         soundObject.unloadAsync()
    //     }
    // }, [])

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
                <Button title={!isStarted ? 'start' : 'pause'} onPressHandler={() => setIsStarted(!isStarted)} />
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
