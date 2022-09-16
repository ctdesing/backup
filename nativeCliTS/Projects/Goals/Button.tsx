import React from "react"
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import theme from "../../theme"

type Props = {
  onPress?: () => void
  title: string
  width?: string
  backgroundColor?: string
  color?: string,
  highlight?: string,
  style?: StyleProp<ViewStyle>
}

const Button = ({
                  onPress,
                  title,
                  width,
                  backgroundColor,
                  highlight,
                  color,
                  style
}: Props): JSX.Element => {

  color = color ?? "#FFF"
  backgroundColor = backgroundColor ?? theme.primary
  highlight = highlight ?? theme.highlight

  return (
    <Pressable
      android_ripple={{color: highlight}}
      onPress={onPress}
      style={[styles.button, { width, backgroundColor }, style]}>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: "10%",
    paddingVertical: "3%",
    borderRadius: 5,
    margin: "2%"
  },
  title: {
    textAlign: "center",
  }
})

export default Button