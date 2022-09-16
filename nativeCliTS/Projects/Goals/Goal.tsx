import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import theme from "../../theme";

export class Goal {
  value: string
  checked: boolean

  constructor(value: string) {
    this.value = value
    this.checked = false
  }

  check() {
    this.checked = true
  }
}

type Props = {
  goal: Goal,
  onPress: () => void
}

const GoalUI = ({goal, onPress}: Props): JSX.Element => {
  const goalChecked = goal.checked ? styles.goalChecked : {}
  return (
    <Pressable
      android_ripple={{color: theme.highlight}}
      onPress={onPress}
      style={styles.goalView}>
      <Text
        style={{...styles.goal, ...goalChecked}}>
        {goal.value}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goalView: {
    margin: "2%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    borderRadius: 10,
    backgroundColor: theme.primary,
  },
  goal: {
    textTransform: "capitalize",
    color: theme.color
  },
  goalChecked: {
    color: theme.secondary,
    textDecorationStyle: "solid",
    textDecorationLine: "line-through"
  },
});

export default GoalUI
