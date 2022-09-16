import React from "react";
import { NavigationProp } from "@react-navigation/native"
import { CATEGORIES } from "./data";
import Button from "./Button";
import { Dimensions, StyleSheet, View } from "react-native";
import ImageButton from "./ImageButton";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  navigation: NavigationProp<any>
}

const Categories = ({navigation}: Props): JSX.Element => {
  const height = Dimensions.get('screen').height * 0.20

  const handlePress = (id: string, title: string) => {
    navigation.navigate("Meals", {id, title})
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {CATEGORIES.map(cat => {
          if (cat.imageUrl !== undefined) {
            return (
              <ImageButton
                key={cat.id}
                title={cat.title}
                onPress={() => handlePress(cat.id, cat.title)}
                width={"40%"}
                height={height}
                backgroundImage={cat.imageUrl}
                highlight={"rgba(0,0,0,0.1)"}/>
            )
          }

          return  (
            <Button
              key={cat.id}
              title={cat.title}
              onPress={() => handlePress(cat.id, cat.title)}
              width={"40%"}
              height={height}
              backgroundColor={cat.color}
              highlight={"rgba(0,0,0,0.1)"}/>
        )

        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
})

export default Categories