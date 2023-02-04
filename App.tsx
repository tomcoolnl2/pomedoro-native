
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { FocusSubject } from './src/model'
import { Theme } from './src/theme'
import { uuidv4 } from './src/utils'
import { Timer, AddSubject, SubjectHistory } from './src/components'


const App: React.FC = () => {

    const [ currentSubject, setCurrentSubject ] = React.useState<string>(null)
    const [ subjectHistory, setSubjectHistory ] = React.useState<FocusSubject[]>([])

    const saveSubjectHistory = React.useCallback(async () => {
        try {
            await AsyncStorage.setItem('subjectHistory', JSON.stringify(subjectHistory))
        } catch (e) {
            console.error(e)
        }
    }, [subjectHistory])

    const loadSubjectHistory = React.useCallback(async () => {
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
        loadSubjectHistory()
    }, [])

    React.useEffect(() => {
        saveSubjectHistory()
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
                ? <Timer
                    subject={currentSubject}
                    clearSubject={clearSubjectHandler}
                    onTimerEnd={onTimerEndHandler}
                />
                : <View style={styles.focusContainer}>
                    <AddSubject addSubject={setCurrentSubject} />
                    <SubjectHistory
                        subjectHistory={subjectHistory}
                        setSubjectHistory={setSubjectHistory}
                    />
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.indianred
    },
    focusContainer: { 
        flex: 1, 
    }
})

// expo requires a default exports
export default App
