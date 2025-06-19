import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import AddCustomer from '../screens/Driver_screens/AddCustomer';
import AddTruck from '../screens/Driver_screens/AddTruck';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();
export type RootStackParamList = {
  MainTab: undefined;
  AddTruck: undefined;
  AddCustomer: undefined;
};

// Remove the duplicate Stack declaration
const Stack = createStackNavigator<RootStackParamList>();

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_WIDTH = SCREEN_WIDTH / 3; // 👈 force exactly 3 tabs

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const label =
          descriptors[route.key].options.tabBarLabel ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigatorComponent: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Trucks"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',  // This centers all headers
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Trucks" 
        component={TrucksScreen}
        options={{
          headerTitle: 'Trucks',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Invoice" component={InvoiceScreen} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTab" 
        component={TabNavigatorComponent} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddTruck" 
        component={AddTruck}
        options={{ title: 'Add Truck' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 70,
    backgroundColor: Theme.Colors.inactiveNavBackground,
    borderTopColor: Theme.Colors.lightGray,
    borderTopWidth: 0.5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Theme.Colors.activeNavBackground,
  },
  tabLabel: {
    color: Theme.Colors.navIconColor,
    fontSize: 14,
    fontWeight: '500',
  },
  activeLabel: {
    color: Theme.Colors.white,
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  tabBarLabel: {
    textAlign: 'center',
  }
});



export default StackNavigator;
