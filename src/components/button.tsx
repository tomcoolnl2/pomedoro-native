
import React from 'react'
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { Theme } from '../theme'


interface Props {
    style?: ViewStyle
    textStyle?: TextStyle
    size?: number
    onPressHandler: () => void
    title: string
}

export const Button: React.FC<Props> = ({ style = {}, textStyle = {}, size = 125, onPressHandler, title }) => {
    return (
        <TouchableOpacity style={[styles(size).radius, style]} onPress={onPressHandler}>
            <Text style={[styles(size).text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = (size: number) => StyleSheet.create({
    radius: {
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Theme.color.cornsilk,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, .1)'
    },
    text: Theme.text
})
