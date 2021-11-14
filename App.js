
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { uuidv4 } from './src/utils/uuid'
import { Timer } from './src/features/timer/Timer'
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'


// expo requires a default exports
export default function App() {

  const [focusSubject, setFocusSubject] = useState(null)
  const [focusHistory, setFocusHistory] = useState([])

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')
      const focusHistory = JSON.parse(history)
      if (history && focusHistory.length) {
        setFocusHistory(focusHistory)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  }, [])

  useEffect(() => {
    console.log(focusHistory)
    saveFocusHistory()
  }, [focusHistory])

  const clearSubjectHandler = useCallback(() => {
    setFocusHistory([
      ...focusHistory,
      { subject: focusSubject, status: 0, key: uuidv4() }
    ])
    setFocusSubject(null)
  }, [focusHistory])

  const onTimerEndHandler = useCallback(() => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focusContainer: { 
    flex: 1, 
    backgroundColor: '#252250'
  }
})
