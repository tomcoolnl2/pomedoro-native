import { TextStyle } from "react-native"

const fontSize = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 80,
}

const padding = {
    ...fontSize,
}

const textShadow = {
    textShadowColor: 'rgba(52, 40, 44, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: padding.sm / 2
}

const color = {
    indianred: 'indianred',
    tomato: 'tomato',
    firebrick: 'firebrick',
    cornsilk: 'cornsilk',
    wheat: 'wheat',
}

const text = {
    color: color.cornsilk,
    fontSize: fontSize.md,
    textAlign: 'center',
    ...textShadow
} as TextStyle

const title = {
    ...text,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    padding: padding.md,
} as TextStyle

export const Theme = {
    color,
    title,
    text,
    fontSize,
    padding,
}