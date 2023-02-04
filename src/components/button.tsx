
import React from 'react'
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { Theme } from '../theme'


interface Props {
    style?: ViewStyle
    textStyle?: TextStyle
    size?: number
    title?: string
    icon?: ImageSourcePropType
    onPressHandler: <T = void>() => T | Promise<T>
}

export const Button: React.FC<Props> = ({ style = {}, textStyle = {}, size = 125, onPressHandler, title, icon }) => {
    return (
        <TouchableOpacity style={[styles(size).radius, style]} onPress={onPressHandler}>
            {title 
                ? <Text style={[styles(size).text, textStyle]}>{title}</Text>
                : null}
            {icon 
                ? <Image source={icon} style={styles(size).image} />
                : null}
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
    text: Theme.text,
    image: {
        width: Theme.size.lg,
        height: Theme.size.lg,
    }
})
