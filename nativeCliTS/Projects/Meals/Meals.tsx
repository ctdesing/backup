import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions, Pressable, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { MEALS } from "./data";
import Meal from "./data/models/meal";

export type ParamList = {
  params: {
    id: string,
    title: string
  }
}

export type Props = {
  route: RouteProp<ParamList>,
  navigation: NavigationProp<any>
}

const Meals = ({route, navigation}: Props): JSX.Element => {
  const { id, title } = route.params

  useEffect(()=> {
  // better approach than in-route options
    navigation.setOptions({title})
  }, [navigation])

  const renderMeals = (item: Meal): JSX.Element => {
    return (
      <View key={item.id} style={styles.mealsContainer}>
        <Pressable
          onPress={() => navigation.navigate("Meal", {id: item.id, title: item.title})}
          style={({pressed}) => [pressed ? styles.pressed : {}]}>
          <View style={styles.meal}>
            <Image source={{uri: item.imageUrl}} style={styles.image}/>
            <Text style={styles.mealTitle}>{item.title}</Text>
            <View style={styles.details}>
              <Text style={styles.detail}>{item.duration}</Text>
              <Text style={styles.detail}>{item.complexity.toUpperCase()}</Text>
              <Text style={styles.detail}>{item.affordability.toUpperCase()}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
      <View style={styles.root}>
        {MEALS.filter(meal => meal.categoryIds.includes(route.params.id)).map(meal => renderMeals(meal))}
      </View>
    </ScrollView>
  )
}

const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  mealsParent: {
    flexGrow: 1,
  },
  mealsContainer: {
    height: height / 3 + 50,
    width: "80%",
    marginVertical: "2%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
  },
  meal: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: "82%",
    width: "100%",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: "2%"
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  detail: {
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.5
  }
})

export default Meals