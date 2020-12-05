import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

export type StackParamList = {
  Search: undefined;
  SearchDetails: {title: string};
};

export type TabParamList = {
  Library: undefined;
  Settings: undefined;
  Search: undefined;
};

export type SearchScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StackParamList, 'Search'>,
  MaterialBottomTabNavigationProp<TabParamList>
>;

export type SearchDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StackParamList, 'SearchDetails'>,
  MaterialBottomTabNavigationProp<TabParamList>
>;

export type LibraryScreenRouteProp = RouteProp<TabParamList, 'Library'>;

export type LibraryScreenNavigationProp = MaterialBottomTabNavigationProp<
  TabParamList,
  'Library'
>;

export type LibraryScreenBaseProps = {
  route: LibraryScreenRouteProp;
  navigation: LibraryScreenNavigationProp;
};

export type MangaGenreState = {
  [index: string]: {added: boolean; removed: boolean};
};
