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

type Truck = {
  id: string;
  number: string;
  driverName: string;
  status: 'Active' | 'In Transit' | 'Inactive';
};

type Props = BottomTabScreenProps<TabParamList, 'Trucks'>;

const TrucksScreen: React.FC<Props> = ({ navigation }) => {
  const [trucks, setTrucks] = useState<Truck[]>([
    { id: '1', number: 'MH 29 CB-2233', driverName: 'Rahul Patil', status: 'Active' },
    { id: '2', number: 'MH 31 DF-7831', driverName: 'Amit Sharma', status: 'In Transit' },
    { id: '3', number: 'MH 12 AB-9876', driverName: 'Sunil Deshmukh', status: 'Active' },
  ]);

  const getStatusStyles = (status: Truck['status']) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#DFF2E1', color: '#2E7D32' };
      case 'In Transit':
        return { backgroundColor: '#FFF8E1', color: '#F9A825' };
      case 'Inactive':
        return { backgroundColor: '#FFEBEE', color: '#C62828' };
      default:
        return { backgroundColor: '#ECEFF1', color: '#607D8B' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trucks</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Truck List with Add Button at End */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {trucks.map((truck) => {
          const { backgroundColor, color } = getStatusStyles(truck.status);
          return (
            <View key={truck.id} style={styles.truckCard}>
              <View style={styles.truckHeader}>
                <MaterialIcons name="local-shipping" size={22} color={Colors.primary} />
                <Text style={styles.truckNumber}>{truck.number}</Text>
              </View>
              <Text style={styles.driverName}>Driver: {truck.driverName}</Text>
              <View style={[styles.statusBadge, { backgroundColor }]}>
                <Text style={[styles.statusText, { color }]}>{truck.status}</Text>
              </View>
            </View>
          );
        })}

        {/* Add Truck Button BELOW the last card */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add_Truck')}
        >
          <Icon name="add-circle" size={22} color={Colors.white} />
          <Text style={styles.addButtonText}>Add New Truck</Text>
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
  truckCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  truckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  truckNumber: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: '#1A1A1A',
    fontFamily: 'monospace',
    marginLeft: Spacing.sm,
  },
  driverName: {
    fontSize: FontSizes.small,
    color: '#3A3A3A',
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 4,
  },
  statusText: {
    fontSize: FontSizes.small - 1,
    fontWeight: FontWeights.bold,
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

export default TrucksScreen;
