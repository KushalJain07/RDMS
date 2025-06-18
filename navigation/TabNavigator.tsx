import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
import Add_Truck from '../screens/Driver_screens/Add_Truck';
import AddCustomer from '../screens/Driver_screens/AddCustomer';
import { TabParamList } from '../types/navigation';
import { Theme } from '../constants/theme';

const Tab = createBottomTabNavigator<TabParamList>();

const iconMapping: Record<string, string> = {
  Trucks: 'local-shipping',
  Customers: 'people',
  Invoices: 'receipt-long',
};

const TabBarIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <MaterialIcons
    name={iconMapping[name] || 'error'}
    size={28}
    color={color}
    style={{ marginBottom: -2 }}
  />
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Trucks"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: Theme.Colors.activeNavBackground,
        tabBarInactiveTintColor: Theme.Colors.navIconColor,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 75 : 60,
          paddingBottom: Platform.OS === 'ios' ? 15 : 8,
          backgroundColor: Theme.Colors.inactiveNavBackground,
          borderTopWidth: 1,
          borderTopColor: Theme.Colors.lightGray,
          elevation: 4,
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 2,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <Tab.Screen name="Trucks" component={TrucksScreen} options={{ tabBarLabel: 'Trucks' }} />
      <Tab.Screen name="AddTruck" component={Add_Truck} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Customers" component={CustomersScreen} options={{ tabBarLabel: 'Customers' }} />
      <Tab.Screen name="Invoices" component={InvoiceScreen} options={{ tabBarLabel: 'Invoices' }} />
      <Tab.Screen name="AddCustomer" component={AddCustomer} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
