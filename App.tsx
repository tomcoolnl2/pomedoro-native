
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { uuidv4 } from './src/utils/uuid'
import { Timer } from './src/features/timer/Timer'
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'


const App: React.FC = () => {

    const [ focusSubject, setFocusSubject ] = React.useState(null)
    const [ focusHistory, setFocusHistory ] = React.useState([])

    const saveFocusHistory = React.useCallback(async () => {
        try {
            await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
        } catch (e) {
            console.error(e)
        }
    }, [])

    const loadFocusHistory = React.useCallback(async () => {
        try {
            const history = await AsyncStorage.getItem('focusHistory')
            const focusHistory = JSON.parse(history)
            if (history && focusHistory.length) {
                setFocusHistory(focusHistory)
            }
        } catch (e) {
            console.error(e)
        }
    }, [])

    React.useEffect(() => {
        loadFocusHistory()
    }, [])

    React.useEffect(() => {
        saveFocusHistory()
    }, [focusHistory])

    const clearSubjectHandler = React.useCallback(() => {
        setFocusHistory([
            ...focusHistory,
            { subject: focusSubject, status: 0, key: uuidv4() }
        ])
        setFocusSubject(null)
    }, [focusHistory])

    const onTimerEndHandler = React.useCallback(() => {
        setFocusHistory([
            ...focusHistory,
            { subject: focusSubject, status: 1, key: uuidv4() }
        ])
        setFocusSubject(null)
    }, [focusHistory])

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            {focusSubject 
                ? (
                    <Timer
                        subject={focusSubject}
                        clearSubject={clearSubjectHandler}
                        onTimerEnd={onTimerEndHandler}
                    />
                ) : (
                    <View style={styles.focusContainer}>
                        <Focus addSubject={setFocusSubject} />
                        <FocusHistory
                            focusHistory={focusHistory}
                            setFocusHistory={setFocusHistory}
                        />
                    </View>
                )}
        </View>
    )
}

// expo requires a default exports
export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    focusContainer: { 
        flex: 1, 
        backgroundColor: '#252250'
    }
})
