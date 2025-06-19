import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Theme} from '../../constants/theme';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../../types/navigation';
import {Invoice} from '../../src/types';

// ✅ Simulate import inside logic scope, not JSX:
import {invoices as mockInvoices} from '../../src/mockData/invoices';

const {Colors, FontSizes, Spacing, BorderRadius} = Theme;

type Props = BottomTabScreenProps<TabParamList, 'Invoices'>;

const InvoiceScreen: React.FC<Props> = ({navigation}) => {
  const [invoiceList, _setInvoiceList] = useState<Invoice[]>(mockInvoices);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Invoices</Text>
        <View style={{width: 24}} />
      </View>

      {/* Invoice List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {invoiceList.map(invoice => (
          <View key={invoice.id} style={styles.invoiceCard}>
            <View style={styles.invoiceHeader}>
              <MaterialIcons name="receipt" size={22} color={Colors.primary} />
              <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
            </View>
            <Text style={styles.customerName}>
              Customer: {invoice.customerName}
            </Text>
            <Text style={styles.invoiceAmount}>
              ₹ {invoice.amount.toLocaleString()}
            </Text>
            <Text style={styles.invoiceDate}>Date: {invoice.date}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{invoice.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Invoice Button
      <TouchableOpacity
        style={styles.floatingAddButton}
        onPress={() => navigation.navigate('Add_Invoice' as never)}>
        <Icon name="add" size={20} color={Colors.white} />
        <Text style={styles.floatingAddButtonText}>Add Invoice</Text>
      </TouchableOpacity> */}
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
  color: Colors.white,
  fontWeight: 'bold',
  marginLeft: 144,
  marginTop: 4,
 },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 150,
    paddingTop: Spacing.md,
  },
  invoiceCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  invoiceNumber: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontFamily: 'monospace',
    marginLeft: Spacing.sm,
  },
  customerName: {
    fontSize: FontSizes.small,
    color: '#3A3A3A',
    marginBottom: Spacing.xs,
  },
  invoiceAmount: {
    fontSize: FontSizes.medium,
    color: '#000',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  invoiceDate: {
    fontSize: FontSizes.small,
    color: '#555',
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
  },
  statusText: {
    fontSize: FontSizes.small - 2,
    color: '#1565C0',
    fontWeight: 'bold',
  },
  floatingAddButton: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: 100,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  floatingAddButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.xs,
  },
});

export default InvoiceScreen;
