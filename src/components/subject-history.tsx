
import React from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native'
import type { FocusSubject } from '../model'
import { Theme } from '../theme'
import { Button } from './button'


interface Props {
    subjectHistory: FocusSubject[]
    setSubjectHistory: (subjectHistory: FocusSubject[]) => void
}

export const SubjectHistory: React.FC<Props> = ({ subjectHistory, setSubjectHistory }) => {
  
    const clearHistory = React.useCallback(() => {
        setSubjectHistory([])
    }, [setSubjectHistory])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Things we've focused on
                </Text>
                {subjectHistory.length > 0 
                    ? <FlatList
                        style={styles.listStyle}
                        contentContainerStyle={styles.contentContainerStyle}
                        data={subjectHistory}
                        renderItem={({ item }) => {
                            return item.subject !== null && (
                                <Text style={styles.text}>
                                    {`${item.status > 0 ? '✅' : '❌'} ${item.subject}`}
                                </Text>
                            )
                        }}
                    />
                    : <Text style={styles.title}>No focus at all...</Text>
                }
                {!subjectHistory.length && (
                    <Text style={styles.text}>Nothing yet</Text>
                )}
            </SafeAreaView>
            <View style={styles.clearContainer}>
                <Button size={75} title='Clear' onPressHandler={clearHistory} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center'
    },
    title: Theme.title,
    text: Theme.text,
    clearContainer: {
        alignItems: 'center',
        padding: Theme.size.sm
    },
    listStyle: { 
        width: '100%', 
        height: '100%', 
        paddingTop: Theme.size.md
    },
    contentContainerStyle: {
        alignItems: 'flex-start'
    }
})
