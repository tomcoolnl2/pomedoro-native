
import React, { useEffect, useState, useRef } from 'react'
import { Text, StyleSheet } from 'react-native'
import { fontSizes, paddingSizes } from '../utils/sizes'


const minToMs = (min: number): number => min * 1000 * 60
const formatTime = (time: number): string => (time < 10 ? `0${time}` : String(time))


interface Props {
  minutes: number
  isPaused: boolean
  onStart?: () => void
  onPause: () => void
  onEnd: () => void
  onProgress: (p: number) => void
}

export const Countdown: React.FC<Props> = ({ minutes = 20, isPaused, onStart, onPause, onEnd, onProgress }) => {
  
    const [ ms, setMs ] = useState(minToMs(minutes))
    const interval = useRef(null)

    const countDown = () => {
        return setMs((time) => {
            if (time === 0) {
                clearInterval(interval.current)
                onEnd()
                return time
            }
            const timeLeft = time - 1000
            onProgress((timeLeft / minToMs(minutes)) * 100)
            return timeLeft
        })
    }

    useEffect(() => {
        setMs(minToMs(minutes))
    }, [minutes])

    useEffect(() => {
        if (isPaused) {
            onPause()
            if (interval.current) clearInterval(interval.current)
            return
        }
        onStart()
        interval.current = setInterval(countDown, 1000)

        return () => clearInterval(interval.current)
    }, [isPaused])

    const minute = ((ms / 1000 / 60) << 0) % 60
    const seconds = ((ms / 1000) << 0) % 60
    return (
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </Text>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        color: '#fff',
        padding: paddingSizes.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)',
    },
})
