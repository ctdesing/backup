import React, {useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageProps
} from "react-native";
import GoalUI, { Goal } from "./Goal"
import GoalForm from "./GoalForm"
import Button from "./Button";
import theme from "../../theme"

const GoalsList = (): JSX.Element => {
  const [goalsList, setGoalsList] = useState(Array<Goal>)
  const [showModal, setShowModal] = useState(false)

  const handleAddGoal = (goal: string) => {
    setGoalsList(prevState => [...prevState, new Goal(goal)])
    setShowModal(false)
  }

  const handleRemoveGoal = (item: number) => {
    if (!goalsList[item].checked) {
      setGoalsList(prevState => prevState.map((goal, i) => {
        if (i === item) {
          goal.check()
        }

        return goal
      }))
      return
    }

    setGoalsList(prevState => prevState.filter((_, i) => i !== item))
  }

  return (
    <View style={styles.view}>
      <View style={styles.formContainer}>
        <Button
          title="Add Goal"
          onPress={()=> setShowModal(true)} />
        <Modal visible={showModal} animationType={"slide"}>
          <GoalForm
            onSubmit={handleAddGoal}
            cancel={()=> setShowModal(false)} />
        </Modal>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        style={styles.goalsContainer}>
        <View>
          {
            goalsList.length
              ? <></>
              : <Text style={styles.text}>You have no goals yet!</Text>
          }
          {
            goalsList.map((goal, i) => {
              return (
                <GoalUI
                  key={i}
                  goal={goal}
                  onPress={()=> handleRemoveGoal(i)}
                />
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  view: {
    paddingHorizontal: "5%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.backgroundColor
  },
  button: {
    backgroundColor: theme.primary,
    color: theme.color,
    width: "20%",

  },
  text: {
    color: theme.color
  },
  goalsContainer: {
    flex: 4
  },
  formContainer: {
    paddingVertical: "15%",
    marginBottom: "10%",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
})

export default GoalsList
