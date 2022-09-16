import React from "react"
import { Image, Platform, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import theme from "../../theme"

const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg'

type Props = {
  onPress?: () => void
  title: string
  width?: string | number
  height?: string | number
  backgroundImage: string
  color?: string,
  highlight?: string,
  style?: StyleProp<ViewStyle>
}

const ImageButton = ({
                  onPress,
                  title,
                  width,
                  height,
                  backgroundImage,
                  highlight,
                  color,
                  style
}: Props): JSX.Element => {

  color = color ?? "#FFF"
  highlight = highlight ?? theme.highlight
  width = width ?? "10%"
  height = height ?? "3%"

  return (
    <Pressable
      android_ripple={{color: highlight}}
      onPress={onPress}
      style={({pressed}) =>  [
        styles.button,
        { width, height },
        style,
        pressed ? styles.pressed : styles.notPressed]}>
      <Image
        source={{uri: backgroundImage}}
        style={styles.image} />
      <View style={styles.textBackground}>
        <Text style={[styles.title, {color}]}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    margin: "2%",
    borderRadius: 5,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    height: "100%",
    width: "100%",
    // borderRadius: 5,
  },
  title: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  textBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(20,20,20,0.2)",
    // borderRadius: 5
  },
  pressed: {
    opacity: 0.5
  },
  notPressed: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  }
})

export default ImageButton