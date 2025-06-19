import React from 'react';
<<<<<<< HEAD
import { Dimensions, StyleSheet } from 'react-native';
=======
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
>>>>>>> 31f2c7173b66aa9de58bcc39690daa6aaa00a1e3
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
<<<<<<< HEAD
import Add_Truck from '../screens/Driver_screens/AddTruck';
import AddCustomer from '../screens/Driver_screens/AddCustomer';
=======
>>>>>>> 31f2c7173b66aa9de58bcc39690daa6aaa00a1e3
import { TabParamList } from '../types/navigation';
import { Theme } from '../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabParamList>();
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

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Trucks"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
<<<<<<< HEAD
        tabBarIcon: ({ color }) => <TabBarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: Theme.Colors.activeNavBackground,
        tabBarInactiveTintColor: Theme.Colors.navIconColor,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: {
          width: TAB_WIDTH, // 👈 each tab gets 1/3 of screen width
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <Tab.Screen name="Trucks" component={TrucksScreen} options={{ tabBarLabel: 'Trucks' }} />
      <Tab.Screen name="Customers" component={CustomersScreen} options={{ tabBarLabel: 'Customers' }} />
      <Tab.Screen name="Invoices" component={InvoiceScreen} options={{ tabBarLabel: 'Invoices' }} />
      <Tab.Screen name="AddTruck" component={Add_Truck} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="AddCustomer" component={AddCustomer} options={{ tabBarButton: () => null }} />
=======
      }}
    >
      <Tab.Screen name="Trucks" component={TrucksScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Invoices" component={InvoiceScreen} />
>>>>>>> 31f2c7173b66aa9de58bcc39690daa6aaa00a1e3
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  tabBarStyle: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tabBarLabelStyle: {
    fontSize: 12,
=======
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
>>>>>>> 31f2c7173b66aa9de58bcc39690daa6aaa00a1e3
  },
});

export default TabNavigator;
