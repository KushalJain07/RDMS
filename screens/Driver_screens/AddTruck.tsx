import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Theme } from '../../constants/theme';

type TruckDetails = {
  numberPlate: string;
  truckNumber: string;
  driverName: string;
  contactNumber: string;
  vehicleModel: string;
  receiptRange: string;
};

const AddTruckScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [truck, setTruck] = useState<TruckDetails>({
    numberPlate: '',
    truckNumber: '',
    driverName: '',
    contactNumber: '',
    vehicleModel: '',
    receiptRange: '',
  });

  const handleSubmit = () => {
    Alert.alert('Saved', 'Truck details saved (mock). API pending.');
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Truck Information</Text>

          <Text style={styles.label}>
            Truck Number Plate <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="MH12AB1234"
            placeholderTextColor={Theme.Colors.gray}
            value={truck.numberPlate}
            onChangeText={(text) => setTruck({ ...truck, numberPlate: text })}
          />

          <Text style={styles.label}>
            Truck Number <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter internal truck ID"
            placeholderTextColor={Theme.Colors.gray}
            value={truck.truckNumber}
            onChangeText={(text) => setTruck({ ...truck, truckNumber: text })}
          />

          <Text style={styles.label}>
            Driver Name <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter driver's full name"
            placeholderTextColor={Theme.Colors.gray}
            value={truck.driverName}
            onChangeText={(text) => setTruck({ ...truck, driverName: text })}
          />

          <Text style={styles.label}>
            Contact Number <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter driver's contact number"
            placeholderTextColor={Theme.Colors.gray}
            keyboardType="phone-pad"
            value={truck.contactNumber}
            onChangeText={(text) => setTruck({ ...truck, contactNumber: text })}
          />

          <Text style={styles.label}>Vehicle Model</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Tata Ace, Eicher 407"
            placeholderTextColor={Theme.Colors.gray}
            value={truck.vehicleModel}
            onChangeText={(text) => setTruck({ ...truck, vehicleModel: text })}
          />

          <Text style={styles.label}>Receipt Range</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100 - 200"
            placeholderTextColor={Theme.Colors.gray}
            value={truck.receiptRange}
            onChangeText={(text) => setTruck({ ...truck, receiptRange: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Truck</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    paddingVertical: Theme.Spacing.xl,
    paddingHorizontal: Theme.Spacing.lg,
    justifyContent: 'space-between',
    paddingTop: Theme.Spacing.xxl,
  },
  headerTitle: {
    color: Theme.Colors.white,
    fontSize: Theme.FontSizes.xl,
    fontWeight: 'bold',
    fontFamily: Theme.Fonts.bold,
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: Theme.Spacing.lg,
  },
  form: {
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.lg,
    padding: Theme.Spacing.lg,
    ...Theme.Shadows.medium,
  },
  sectionTitle: {
    fontSize: Theme.FontSizes.large,
    fontWeight: '600',
    color: Theme.Colors.black80,
    marginBottom: Theme.Spacing.md,
  },
  label: {
    fontSize: Theme.FontSizes.medium,
    fontWeight: '500',
    color: Theme.Colors.black80,
    marginBottom: Theme.Spacing.xs,
    fontFamily: Theme.Fonts.regular,
  },
  asterisk: {
    color: Theme.Colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.Colors.lightGray,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.md,
    marginBottom: Theme.Spacing.lg,
    fontSize: Theme.FontSizes.medium,
    color: Theme.Colors.black,
    fontFamily: Theme.Fonts.regular,
  },
  submitButton: {
    backgroundColor: Theme.Colors.primaryDark,
    padding: Theme.Spacing.lg,
    borderRadius: Theme.BorderRadius.md,
    alignItems: 'center',
    marginTop: Theme.Spacing.md,
  },
  submitButtonText: {
    color: Theme.Colors.white,
    fontSize: Theme.FontSizes.medium,
    fontWeight: 'bold',
    fontFamily: Theme.Fonts.bold,
  },
});

export default AddTruckScreen;
