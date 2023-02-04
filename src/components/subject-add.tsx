

import React from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from './button'
import { Theme } from '../theme'


interface Props {
    addSubject: (subjectItem: string) => void
}

export const AddSubject: React.FC<Props> = ({ addSubject }) => {
  
    const [ subject, setSubject ] = React.useState<string>(null)

    const onSubmitSubject = React.useCallback(({ nativeEvent: { text } }) => {
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
                    onSubmitEditing={onSubmitSubject}
                    onChangeText={setSubject}
                    label={'Add item'}
                />
                <Button
                    style={styles.addSubjectCTA}
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
        padding: Theme.padding.md,
        justifyContent: 'center' 
    },
    title: {
        ...Theme.title
    },
    textInput: { 
        flex: 1
    },
    addSubjectCTA: { 
        marginLeft: Theme.padding.md, 
        alignSelf: 'center' 
    },
})
