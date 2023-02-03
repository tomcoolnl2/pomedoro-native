

import React, { useCallback, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet, Text } from 'react-native'
import { RoundedButton } from '../../components/RoundedButton'
import { fontSizes } from '../../utils/sizes'


export const Focus = ({ addSubject }) => {
  
    const [focusItem, setFocusItem] = useState(null)

    const onSubmitEditingHandler = useCallback(({ nativeEvent: { text } }) => setFocusItem(text), [])

    const onPressHandler = useCallback(() => addSubject(focusItem), [focusItem])
  
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>What would you like to focus on?</Text>
            <View style={styles.container}>
                <TextInput
                    style={{ flex: 1 }}
                    maxLength={50}
                    value={focusItem}
                    onSubmitEditing={onSubmitEditingHandler}
                />
                <RoundedButton
                    style={styles.addSubject}
                    size={50}
                    title='+'
                    onPress={onPressHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    titleContainer: { 
        flex: 0.5, 
        padding: 16, 
        justifyContent: 'center' 
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        padding: 16,
        fontSize: fontSizes.lg,
    },
    addSubject: { 
        marginLeft: 10, 
        alignSelf: 'center' 
    },
})
