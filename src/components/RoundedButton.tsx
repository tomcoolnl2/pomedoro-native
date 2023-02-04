
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import * as Theme from '../utils/theme'


interface Props {
    style?: ViewStyle
    textStyle?: TextStyle
    size?: number
    onPressHandler: () => void
    title: string
}

export const RoundedButton: React.FC<Props> = ({ style = {}, textStyle = {}, size = 125, onPressHandler, title }) => {
    return (
        <TouchableOpacity
            style={[styles(size).radius, style]}
            onPress={onPressHandler}
        >
            <Text style={[styles(size).text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = (size: number) =>
    StyleSheet.create({
        radius: {
            borderRadius: size / 2,
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#fff',
            borderWidth: 2,
        },
        text: { 
            color: '#fff',
            fontSize: Theme.fontSizes.md
        }
    })
