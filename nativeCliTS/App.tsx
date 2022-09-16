// import 'react-native-gesture-handler';
import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native"
// import GoalsList from "./Projects/Goals"
import Meals from "./Projects/Meals";
import theme from './theme'

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={"light-content"} backgroundColor={theme.primary} />
      <Meals />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    flex: 1,
  }
})

export default App
