import { RouteProp } from "@react-navigation/native";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { ApisauceInstance } from "apisauce";

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Login: undefined;
  Profile: undefined;
  Settings: undefined;
  Search: undefined;
};

export type SearchScreenRouteProp = RouteProp<TabParamList, "Search">;

export type SearchScreenNavigationProp = MaterialBottomTabNavigationProp<TabParamList, "Search">;

export type SearchScreenProps = {
  route: SearchScreenRouteProp;
  navigation: SearchScreenNavigationProp;
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

export type LibraryScreenRouteProp = RouteProp<TabParamList, "Library">;

export type LibraryScreenNavigationProp = MaterialBottomTabNavigationProp<TabParamList, "Library">;

export type LibraryScreenProps = {
  route: LibraryScreenRouteProp;
  navigation: LibraryScreenNavigationProp;
};

export type MangaGenreState = {
  [index: string]: { added: boolean, removed: boolean },
}