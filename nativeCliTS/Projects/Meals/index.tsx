import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Router from "./Router";

const Index = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <Router />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})

export default Index