import React from "react";
import { NavigationContainer, ParamListBase, RouteProp } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Categories from "./Categories";
import Meals, {ParamList} from "./Meals";
import theme from "../../theme";
import { StyleProp, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Meal from "./Meal";

type RouteParams = {
  route: RouteProp<ParamList, "params">,
  navigation: any
}

const Router = (): JSX.Element => {
  const Stack = createNativeStackNavigator()

  const headerStyle: StyleProp<{backgroundColor?: string | undefined}> = {
    backgroundColor: theme.primary
  }
  const headerTintColor: string = theme.color
  const contentStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.backgroundColor
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Categories"} component={Categories} options={{
          headerStyle,
          headerTintColor,
          contentStyle
        }} />
        <Stack.Screen
          name={"Meals"}
          component={Meals}
          // options={({route}: StackScreenProps<RouteParams>) => ({
          //   title: route.params?.title,
          //   headerStyle,
          //   headerTintColor,
          //   contentStyle,
          // })}
          options={{
            headerStyle,
            headerTintColor,
            contentStyle,
          }} />
        <Stack.Screen
          name={"Meal"}
          component={Meal}
          options={{
            headerStyle,
            headerTintColor,
            contentStyle,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router