import React, { useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Meal from "./data/models/meal";
import { MEALS } from "./data";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Props } from "./Meals";
import Theme from "../../theme";
import theme from "../../theme";

const height = Dimensions.get("screen").height

const MealUI = ({route, navigation}: Props) => {
  const { id, title } = route.params
  const [meal, setMeal] = useState<Meal | null>(null)

  useEffect(() =>{
    navigation.setOptions({
      title: title
    })

    const index = MEALS.findIndex(meal => meal.id === id)
    if (index === -1) {
      return navigation.goBack()
    }

    setMeal(MEALS[index])
  })

  if (!meal) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView>
      <View style={styles.meal}>
        <Image source={{uri: meal.imageUrl}} style={styles.image} />
        <Text style={[styles.title, styles.color]}>{meal.title}</Text>
        <View style={[styles.details]}>
          <Text style={[styles.color]}>{meal.duration}</Text>
          <Text style={[styles.color]}>{meal.complexity}</Text>
          <Text style={[styles.color]}>{meal.affordability}</Text>
        </View>
        <View>
          {meal.ingredients.map(ingredient => (
            <Text>{ingredient}</Text>
          ))}
        </View>
        <View>
          {meal.steps.map(step => (
            <Text>{step}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: height * 0.40
  },
  meal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: "4%"
  },
  color: {
    color: theme.color
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: "8%"
  }
})

export default MealUI