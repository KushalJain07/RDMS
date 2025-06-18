import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../constants/theme';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types/navigation';

const { Colors, FontSizes, FontWeights, Spacing, BorderRadius } = Theme;

type Site = {
  id: string;
  address: string;
};

type Customer = {
  id: string;
  name: string;
  company: string;
  contact: string;
  sites: Site[];
};

type Props = BottomTabScreenProps<TabParamList, 'Customers'>;

const CustomersScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Ramesh Kumar',
      company: 'Kumar Logistics Pvt. Ltd.',
      contact: '+91 9876543210',
      sites: [
        { id: '1', address: 'Plot 23, Transport Nagar, Nagpur' },
        { id: '2', address: 'Warehouse 7, Industrial Zone, Pune' },
      ],
    },
    {
      id: '2',
      name: 'Sneha Jain',
      company: 'Jain Transport Services',
      contact: '+91 9123456789',
      sites: [
        { id: '1', address: 'Jain Hub, Sector 15, Mumbai' },
      ],
    },
    {
      id: '3',
      name: 'Rajeev Mehta',
      company: 'Mehta Cargo Movers',
      contact: '+91 9988776655',
      sites: [],
    },
  ]);

  const toggleSites = (customerId: string) => {
    setExpandedCustomerId(prev => (prev === customerId ? null : customerId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customers</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Customer List */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {customers.map((customer) => (
          <View key={customer.id} style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <MaterialIcons name="person" size={22} color={Colors.primary} />
              <Text style={styles.nameText}>{customer.name}</Text>
            </View>

            <Text style={styles.detailText}>Company: <Text style={styles.detailValue}>{customer.company}</Text></Text>
            <Text style={styles.detailText}>Contact: <Text style={styles.detailValue}>{customer.contact}</Text></Text>
            <Text style={styles.customerIdText}>Customer ID: {customer.id}</Text>

            {customer.sites.length > 0 && (
              <TouchableOpacity onPress={() => toggleSites(customer.id)}>
                <Text style={styles.siteToggle}>
                  {expandedCustomerId === customer.id ? 'Hide Sites ▲' : 'Show Sites ▼'}
                </Text>
              </TouchableOpacity>
            )}

            {expandedCustomerId === customer.id && customer.sites.length > 0 && (
              <View style={{ marginTop: Spacing.sm }}>
                {customer.sites.map((site) => (
                  <Text key={site.id} style={styles.siteAddress}>• {site.address}</Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Add Button inside ScrollView */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddCustomer')}
        >
          <Icon name="add-circle" size={22} color={Colors.white} />
          <Text style={styles.addButtonText}>Add Customer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
  },
  headerTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.md,
  },
  customerCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  nameText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: Colors.black,
    fontFamily: 'monospace',
    marginLeft: Spacing.sm,
  },
  detailText: {
    fontSize: FontSizes.small,
    color: Colors.black80,
    marginTop: Spacing.xs,
  },
  detailValue: {
    fontWeight: FontWeights.medium,
    color: Colors.black,
  },
  customerIdText: {
    fontSize: FontSizes.xs,
    color: Colors.gray,
    marginTop: Spacing.xs,
  },
  siteToggle: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    marginTop: Spacing.sm,
    fontWeight: FontWeights.medium,
  },
  siteAddress: {
    marginLeft: Spacing.md,
    fontSize: FontSizes.xs,
    color: Colors.black80,
    marginTop: 2,
  },
  addButton: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    marginLeft: Spacing.sm,
  },
});

export default CustomersScreen;
