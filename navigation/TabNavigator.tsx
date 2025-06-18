import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
import { TabParamList } from '../types/navigation';
import { Theme } from '../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabParamList>();

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
      }}
    >
      <Tab.Screen name="Trucks" component={TrucksScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Invoices" component={InvoiceScreen} />
    </Tab.Navigator>
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
});

export default TabNavigator;
