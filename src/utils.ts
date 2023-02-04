

export const VIBRATION_PATTERN: number[] = Array.from({ length: 5 }, () => 1000)

export const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const minToMs = (min: number): number => min * 1000 * 60

export const formatTime = (time: number): string => (time < 10 ? `0${time}` : String(time))