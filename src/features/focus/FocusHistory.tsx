
import React from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native'
import * as Theme from '../../utils/theme'
import { RoundedButton } from '../../components/RoundedButton'
import type { FocusSubject } from '../../model'


interface Props {
    focusHistory: FocusSubject[]
    setFocusHistory: (focusHistory: FocusSubject[]) => void
}

export const FocusHistory: React.FC<Props> = ({ focusHistory, setFocusHistory }) => {
  
    const clearHistory = React.useCallback(() => {
        setFocusHistory([])
    }, [setFocusHistory])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Things we've focused on
                </Text>
                {focusHistory.length > 0 && (
                    <FlatList
                        style={styles.listStyle}
                        contentContainerStyle={styles.contentContainerStyle}
                        data={focusHistory}
                        renderItem={({ item }) => {
                            console.log('item', item);
                            return item.subject !== null && (
                                <Text style={styles.historyItem}>
                                    {`${item.status > 0 ? '✅' : '❌'} ${item.subject}`}
                                </Text>
                            )
                        }}
                    />
                )}
                {!focusHistory.length && (
                    <Text style={styles.text}>Nothing yet</Text>
                )}
            </SafeAreaView>
            <View style={styles.clearContainer}>
                <RoundedButton size={75} title='Clear' onPressHandler={clearHistory} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center'
    },
    title: { 
        fontSize: Theme.fontSizes.lg, 
        color: 'white'
    },
    text: { color: 'white' },
    historyItem: {
        color: 'white',
        fontSize: Theme.fontSizes.md
    },
    clearContainer: {
        alignItems: 'center',
        padding: Theme.paddingSizes.sm
    },
    listStyle: { width: '100%', height: '100%', paddingTop: 16 },
    contentContainerStyle: {
        alignItems: 'flex-start'
    }
})
