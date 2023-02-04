import React from 'react'
import { View, StyleSheet } from 'react-native'

import { RoundedButton } from '../../components/RoundedButton'


interface Props {
    changeTime: (time: number) => void
}

export const Timing: React.FC<Props> = ({ changeTime }) => (
    <>
        <View style={styles.timingButton}>
            <RoundedButton size={75} title='10' onPressHandler={() => changeTime(10)} />
        </View>
        <View style={styles.timingButton}>
            <RoundedButton size={75} title='15' onPressHandler={() => changeTime(15)} />
        </View>
        <View style={styles.timingButton}>
            <RoundedButton size={75} title='20' onPressHandler={() => changeTime(20)} />
        </View>
    </>
)

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center'
    }
})
