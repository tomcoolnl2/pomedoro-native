
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { FocusSubject } from './src/model'
import { Theme } from './src/theme'
import { uuidv4 } from './src/utils'
import { Timer, AddSubject, SubjectHistory } from './src/components'
import { Icon } from './images';

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
            <LinearGradient
                colors={[Theme.color.wheat, Theme.color.tomato, Theme.color.indianred]}
                style={styles.gradient} 
                start={[0, 0]} end={[1, 1]}
                locations={[0.25, 0.555, 1]}
            >
                <StatusBar style='light' />
                <Image source={Icon.Tomato} style={styles.image} />
                {currentSubject 
                    ? <Timer
                        subject={currentSubject}
                        clearSubject={clearSubjectHandler}
                        onTimerEnd={onTimerEndHandler}
                    />
                    : <View style={styles.subjectContainer}>
                        <AddSubject addSubject={setCurrentSubject} />
                        <SubjectHistory
                            subjectHistory={subjectHistory}
                            setSubjectHistory={setSubjectHistory}
                        />
                    </View>}
            </ LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.indianred,
    },
    gradient: {
        flex: 1,
    },
    image: {
        width: Theme.padding.xxxl, 
        height: Theme.padding.xxxl,
        marginTop: Theme.padding.xxxl,
        alignSelf: 'center'
    },
    subjectContainer: { 
        flex: 1, 
    }
})

// expo requires a default exports
export default App
