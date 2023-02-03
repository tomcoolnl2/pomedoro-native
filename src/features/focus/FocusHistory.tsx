import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    SafeAreaView
} from 'react-native'
import { fontSizes, paddingSizes } from '../../utils/sizes'
import { RoundedButton } from '../../components/RoundedButton'


export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
  
    const clearHistory = React.useCallback(() => {
        setFocusHistory([])
    }, [setFocusHistory])

    return (
        <>
            <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
                <Text style={{ fontSize: fontSizes.lg, color: 'white' }}>
                    Things we've focused on
                </Text>
                {!!focusHistory.length && (
                    <FlatList
                        style={{ width: '100%', height: '100%', paddingTop: 16 }}
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={focusHistory}
                        renderItem={({ item }) => (
                            <Text style={styles(item.status).historyItem}>
                                {item.subject}
                            </Text>
                        )}
                    />
                )}
                {!focusHistory.length && (
                    <Text style={{ color: 'white' }}>Nothing yet</Text>
                )}
            </SafeAreaView>
            <View style={styles().clearContainer}>
                <RoundedButton size={75} title='Clear' onPress={() => clearHistory()} />
            </View>
        </>
    )
}

const styles = (status = 0) => StyleSheet.create({
    historyItem:{
        color: status > 0 ? 'green' : 'red',
        fontSize: fontSizes.md
    },
    clearContainer: {
        alignItems: 'center',
        padding: paddingSizes.sm
    },
})
