import React from "react"
import { Image, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import theme from "../../theme"

const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg'

type Props = {
  onPress?: () => void
  title: string
  width?: string
  height?: string | number
  backgroundColor?: string
  color?: string,
  highlight?: string,
  style?: StyleProp<ViewStyle>
}

const Button = ({
                  onPress,
                  title,
                  width,
                  height,
                  backgroundColor,
                  highlight,
                  color,
                  style
}: Props): JSX.Element => {

  color = color ?? "#FFF"
  backgroundColor = backgroundColor ?? theme.primary
  highlight = highlight ?? theme.highlight
  width = width ?? "10%"
  height = height ?? "3%"

  return (
    <Pressable
      android_ripple={{color: highlight}}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        { width, height, backgroundColor },
        style,
        pressed ? {} : styles.notPressed]}>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: "2%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  notPressed: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  }
})

export default Button