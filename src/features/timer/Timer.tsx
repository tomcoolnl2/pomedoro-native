import React from 'react'
import { View, StyleSheet, Vibration } from 'react-native'
import { ProgressBar, Text } from 'react-native-paper'
import { Audio } from 'expo-av'
import { useKeepAwake } from 'expo-keep-awake'

import { RoundedButton } from '../../components/RoundedButton'
import { Countdown } from '../../components/Countdown'
import { Timing } from './Timing'

import { bellSound } from '../../../assets/bell.mp3';

export const Timer = ({ subject, clearSubject, onTimerEnd }) => {
  
    useKeepAwake()
  
    const soundObject = new Audio.Sound()

    const [ minutes, setMinutes ] = React.useState<number>(0.1)
    const [ isStarted, setStarted ] = React.useState<boolean>(false)
    const [ pauseCounter, setPauseCounter ] = React.useState(0)
    const [ progress, setProgress ] = React.useState<number>(1)

    const onProgress = React.useCallback((p: number): void => {
        setProgress(p / 100)
    }, [])

    const onPause = React.useCallback((): void => {
        setPauseCounter(pauseCounter + 1)
    }, [pauseCounter])

    const onEnd = React.useCallback(async (): Promise<void> => {
        try {
            await soundObject.loadAsync(bellSound)
            await soundObject.playAsync()
            const interval = setInterval(() => Vibration.vibrate(5000), 1000)
            setTimeout(() => {
                clearInterval(interval)
            }, 10000)
        } catch (error) {
            console.log(error)
        }

        setProgress(1)
        setStarted(false)
        setMinutes(20)
        onTimerEnd()
    }, [])

    const changeTime = (min: number) => {
        setProgress(1)
        setStarted(false)
        setMinutes(min)
    }

    React.useEffect(() => {
        return () => {
            soundObject.unloadAsync()
        }
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
                <View style={{ padding: 50 }}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.task}>{subject}</Text>
                </View>
            </View>
            <View>
                <ProgressBar
                    progress={progress}
                    color='#5E84E2'
                    style={{ height: 10 }}
                />
            </View>

            <View style={styles.buttonWrapper}>
                <Timing changeTime={changeTime} />
            </View>

            <View style={styles.buttonWrapper}>
                {!isStarted ? (
                    <RoundedButton title='start' onPress={() => setStarted(true)} />
                ) : (
                    <RoundedButton title='pause' onPress={() => setStarted(false)} />
                )}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title='-' size={50} onPress={() => clearSubject()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#252250',
        flex: 1,
    },
    countdown: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { color: 'white', textAlign: 'center' },
    task: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    buttonWrapper: {
        flex: .3,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    clearSubject: {
        paddingBottom: 25,
        paddingLeft: 25,
    },
})
