import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApisauceInstance } from 'apisauce';

export type StackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type HomeScreenRouteProp = RouteProp<StackParamList, "Home">;

export type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type State = {
  readonly pages: any
  readonly api: ApisauceInstance
};