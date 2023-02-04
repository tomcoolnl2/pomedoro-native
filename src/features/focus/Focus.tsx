

import React from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet, Text } from 'react-native'
import { RoundedButton } from '../../components/RoundedButton'
import * as Theme from '../../utils/theme'


interface Props {
    addSubject: (focusItem: string) => void
}

export const Focus: React.FC<Props> = ({ addSubject }) => {
  
    const [ subject, setSubject ] = React.useState<string>(null)

    const onSubmitEditingHandler = React.useCallback(({ nativeEvent: { text } }) => {
        setSubject(text)
    }, [])

    const onPressHandler = React.useCallback(() => {
        addSubject(subject)
    }, [subject])
  
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>What would you like to focus on?</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    maxLength={50}
                    value={subject}
                    onSubmitEditing={onSubmitEditingHandler}
                    onChangeText={setSubject}
                    label={'Add item'}
                />
                <RoundedButton
                    style={styles.addSubject}
                    size={50}
                    title='+'
                    onPressHandler={onPressHandler}
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
        fontSize: Theme.fontSizes.lg,
    },
    textInput: { flex: 1 },
    addSubject: { 
        marginLeft: 10, 
        alignSelf: 'center' 
    },
})
