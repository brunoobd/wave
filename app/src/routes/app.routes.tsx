import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type AppRoutes = {
  home: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export const AppRoutes = () => (
  <Navigator
    initialRouteName={"home"}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="home" component={() => <></>} />
  </Navigator>
);
