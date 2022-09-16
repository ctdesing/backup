import React, { useState } from "react"
import { StyleSheet, TextInput, View, Keyboard, Image } from "react-native";
import theme from "../../theme"
import Button from "./Button"

type Props = {
  onSubmit: (goal: string) => void
  cancel: () => void
}

const GoalForm = ({onSubmit, cancel}: Props) => {
  const [goal, setGoal] = useState(String)

  const handlePress = () => {
    if (goal === "") {
      return
    }

    Keyboard.dismiss()
    onSubmit(goal)
    setGoal("")
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/goal.png")}
        style={styles.image}/>
      <View style={styles.inputContainer}>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          style={styles.textInput}
          placeholderTextColor={theme.color}
          placeholder="Your goal!"
          autoFocus={true}/>
      </View>
      <Button onPress={handlePress} title={"Add Goal"} width="80%" />
      <Button
        onPress={cancel}
        title={"Cancel"}
        backgroundColor="#cfcfcf"
        color={"#000"}
        highlight={"#fff"}
        width="80%" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.backgroundColor
  },
  textInput: {
    color: theme.color,
    width: "100%",
    textAlign: "center"
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: theme.primary,
    marginBottom: "2%",
    width: "100%"
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    backgroundColor: theme.backgroundColor,
  }
})

export default GoalForm
