
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { fontSize, padding } from '../theme'


const minToMs = (min: number): number => min * 1000 * 60

const formatTime = (time: number): string => (time < 10 ? `0${time}` : String(time))


interface Props {
  minutes: number
  isPaused: boolean
  onPause: () => void
  onEnd: () => void
  onProgress: (p: number) => void
}

export const Countdown: React.FC<Props> = ({ minutes = 20, isPaused, onPause, onEnd, onProgress }) => {
  
    const [ ms, setMs ] = React.useState<number>(minToMs(minutes))
    const interval = React.useRef<ReturnType<typeof setInterval>>(null)

    const countDown = React.useCallback(() => {
        setMs((time) => {
            if (time === 0) {
                clearInterval(interval.current)
                onEnd()
                return time
            }
            const timeLeft = time - 1000
            onProgress((timeLeft / minToMs(minutes)) * 100)
            return timeLeft
        })
    }, [])

    React.useEffect(() => {
        setMs(minToMs(minutes))
    }, [minutes])

    React.useEffect(() => {
        if (isPaused) {
            onPause()
            if (interval.current) {
                clearInterval(interval.current)
            }
            return
        }

        interval.current = setInterval(countDown, 1000)

        return () => {
            clearInterval(interval.current)
        }
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
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: '#fff',
        padding: padding.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)',
    }
})
