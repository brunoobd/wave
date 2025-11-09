import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { GradientBackground } from "../components/GradientBackground";

const Stack = createNativeStackNavigator();

export function Routes() {
  const { state } = useAuth();

  return (
    <GradientBackground useScrollView={false}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: "Sign in",
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Settings" component={Settings} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GradientBackground>
  );
}
