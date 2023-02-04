
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Theme } from '../theme'
import { minToMs, formatTime } from '../utils'



interface Props {
  minutes: number
  isPaused: boolean
  onPause: () => void
  onEnd: () => void
  onProgress: (progress: number) => void
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
        ...Theme.text,
        fontSize: Theme.fontSize.xxxl,
        fontWeight: 'bold',
        padding: Theme.size.lg,
        backgroundColor: Theme.color.tomato,
    }
})
