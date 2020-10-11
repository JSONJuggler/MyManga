import { RouteProp } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { ApisauceInstance } from "apisauce";

// export type StackParamList = {
//   Home: undefined;
//   Login: undefined;
//   Settings: undefined;
// };

// export type HomeScreenRouteProp = RouteProp<StackParamList, "Home">;

// export type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

// export type HomeScreenProps = {
//   route: HomeScreenRouteProp;
//   navigation: HomeScreenNavigationProp;
// };

// export type LoginScreenRouteProp = RouteProp<StackParamList, "Login">;

// export type LoginScreenNavigationProp = StackNavigationProp<StackParamList, "Login">;

// export type LoginScreenProps = {
//   route: LoginScreenRouteProp;
//   navigation: LoginScreenNavigationProp;
// };

export type TabParamList = {
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type HomeScreenRouteProp = RouteProp<TabParamList, "Home">;

export type HomeScreenNavigationProp = MaterialBottomTabNavigationProp<TabParamList, "Home">;

export type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type LoginScreenRouteProp = RouteProp<TabParamList, "Login">;

export type LoginScreenNavigationProp = MaterialBottomTabNavigationProp<TabParamList, "Login">;

export type LoginScreenProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

export type ProfileScreenRouteProp = RouteProp<TabParamList, "Profile">;

export type ProfileScreenNavigationProp = MaterialBottomTabNavigationProp<TabParamList, "Profile">;

export type ProfileScreenProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

export type State = {
  readonly pages: any
  readonly api: ApisauceInstance
};