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