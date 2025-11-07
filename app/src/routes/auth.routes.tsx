import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => (
  <Navigator initialRouteName={"signIn"} screenOptions={{ headerShown: false }}>
    <Screen name="signIn" component={() => <></>} />
    <Screen name="signUp" component={() => <></>} />
  </Navigator>
);
