
import React from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native'
import type { FocusSubject } from '../model'
import { Theme } from '../theme'


interface Props {
    subjectHistory: FocusSubject[]
}

export const SubjectHistory: React.FC<Props> = ({ subjectHistory }) => {

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Things we've focused on
                </Text>
                {subjectHistory.length > 0 
                    ? <FlatList
                        keyExtractor={item => item.key}
                        style={styles.listStyle}
                        data={subjectHistory}
                        renderItem={({ item }) => {
                            return item.subject !== null && (
                                <View style={styles.listItem}>
                                    <Text>
                                        {`${item.status > 0 ? '✅' : '❌'} ${item.subject}`}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                    : <Text style={styles.text}>No focus at all...</Text>
                }
            </SafeAreaView>
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
    listStyle: { 
        width: '40%',
        paddingTop: Theme.size.md
    },
    listItem: {
        ...Theme.text,
        ...Theme.borderRadius,
        textShadowColor: 'transparent',
        color: Theme.color.grey,
        backgroundColor: Theme.color.white,
        paddingVertical: Theme.size.sm,
        paddingHorizontal: Theme.size.md,
        marginBottom: Theme.size.sm,
        width: '100%',
        textAlign: 'left'
    }
})
