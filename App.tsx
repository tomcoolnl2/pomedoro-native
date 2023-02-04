
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { FocusSubject } from './src/model'
import { uuidv4 } from './src/utils/uuid'
import { Timer } from './src/features/timer/Timer'
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'


// expo requires a default exports
export const App: React.FC = () => {

    const [ currentSubject, setCurrentSubject ] = React.useState<string>(null)
    const [ subjectHistory, setSubjectHistory ] = React.useState<FocusSubject[]>([])

    const saveFocusHistory = React.useCallback(async () => {
        try {
            await AsyncStorage.setItem('subjectHistory', JSON.stringify(subjectHistory))
        } catch (e) {
            console.error(e)
        }
    }, [subjectHistory])

    const loadFocusHistory = React.useCallback(async () => {
        try {
            const history = await AsyncStorage.getItem('subjectHistory')
            const subjectHistory = JSON.parse(history)
            if (history && subjectHistory.length > 0) {
                setSubjectHistory(subjectHistory)
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
    }, [subjectHistory])

    const clearSubjectHandler = React.useCallback(() => {
        setSubjectHistory([
            ...subjectHistory,
            { subject: currentSubject, status: 0, key: uuidv4() }
        ])
        setCurrentSubject(null)
    }, [subjectHistory])

    const onTimerEndHandler = React.useCallback(() => {
        setSubjectHistory([
            ...subjectHistory,
            { subject: currentSubject, status: 1, key: uuidv4() }
        ])
        setCurrentSubject(null)
    }, [subjectHistory])

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            {currentSubject 
                ? (
                    <Timer
                        subject={currentSubject}
                        clearSubject={clearSubjectHandler}
                        onTimerEnd={onTimerEndHandler}
                    />
                ) : (
                    <View style={styles.focusContainer}>
                        <Focus addSubject={setCurrentSubject} />
                        <FocusHistory
                            focusHistory={subjectHistory}
                            setFocusHistory={setSubjectHistory}
                        />
                    </View>
                )}
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal'
    },
    focusContainer: { 
        flex: 1, 
    }
})
