import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SignatureScreen from 'react-native-signature-canvas';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface DeliveryDetails {
  partyName: string;
  address: string;
  material: string;
  quantity: string;
}

const DeliveryNoteScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [signature, setSignature] = useState<string | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState<boolean>(false);
  const signatureRef = React.useRef<any>(null);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    partyName: 'Mr. Gupta', // Set default value
    address: '',
    material: 'Cement', // Set default value
    quantity: '',
  });

  const [isLoading, _setIsLoading] = useState<boolean>(false);
  const signatureWebStyle = '.m-signature-pad--footer {display: none; margin: 0px;}';

  const handleSignature = (sig: string) => {
    setSignature(sig);
    setShowSignaturePad(false);
  };

  const handleEmpty = () => {
    Alert.alert('Warning', 'Please provide a signature.');
  };

  const clearSignature = () => {
    setSignature(null);
  };

  const handleSubmit = async () => {
    // Log form data to check values
    console.log('Form Data:', deliveryDetails);

    // Check if any field is empty
    const emptyFields = Object.entries(deliveryDetails).filter(([_, value]) => !value.trim());

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map(([key]) => key).join(', ');
      console.log('Empty fields:', emptyFieldNames);
      Alert.alert('Error', `Please fill in all fields: ${emptyFieldNames}`);
      return;
    }

    // Basic validation for quantity
    if (!deliveryDetails.quantity || isNaN(Number(deliveryDetails.quantity))) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    try {
      const response = await axios.post('http://192.168.77.238:5001/register', {
        pname: deliveryDetails.partyName || 'Default Party', // Provide default values
        address: deliveryDetails.address || 'Not specified',
        material: deliveryDetails.material || 'Default Material',
        quantity: parseInt(deliveryDetails.quantity),
        
      });

      console.log('API Response:', response.data);
      Alert.alert('Success', 'Delivery note created successfully');
      // Reset form after successful submission
      setDeliveryDetails({
        partyName: 'Mr. Gupta',
        address: '',
        material: 'Cement',
        quantity: '',
        expectedDeliveryDate: '',
        expectedTime: '',
      });
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to create delivery note');
    }
  };

  // Dropdown states for Party Name
  const [openParty, setOpenParty] = useState(false);
  const [partyValue, setPartyValue] = useState(null);
  const [parties, setParties] = useState([
    { label: 'Mr. Gupta', value: 'Mr. Gupta' },
    { label: 'Mrs. Sharma', value: 'Mrs. Sharma' },
    // Add more party names as needed
  ]);

  // Dropdown states for Material
  const [openMaterial, setOpenMaterial] = useState(false);
  const [materialValue, setMaterialValue] = useState(null);
  const [materials, setMaterials] = useState([
    { label: 'Cement', value: 'Cement' },
    { label: 'Steel', value: 'Steel' },
    { label: 'Bricks', value: 'Bricks' },
    // Add more materials as needed
  ]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [partiesRes, materialsRes] = await Promise.all([
          axios.get('http://192.168.77.238:5001/parties'),
          axios.get('http://192.168.77.238:5001/materials')
        ]);
        setParties(partiesRes.data);
        setMaterials(materialsRes.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>New Delivery Note</Text>
            <Text style={styles.headerSubtitle}>Fill in the details below</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* Party Name Dropdown */}
          <Text style={styles.label}>Party Name</Text>
          <DropDownPicker
            open={openParty}
            value={partyValue}
            items={parties}
            setOpen={setOpenParty}
            setValue={setPartyValue}
            setItems={setParties}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Party Name"
            zIndex={3000}
            zIndexInverse={1000}
          />

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Delivery Address</Text>
            <View style={styles.inputContainer}>
              <Icon name="location-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter delivery address"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                multiline
                value={deliveryDetails.address}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, address: text })
                }
              />
            </View>
          </View>

          {/* Material Dropdown */}
          <Text style={styles.label}>Material</Text>
          <DropDownPicker
            open={openMaterial}
            value={materialValue}
            items={materials}
            setOpen={setOpenMaterial}
            setValue={setMaterialValue}
            setItems={setMaterials}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Select Material"
            zIndex={2000}
            zIndexInverse={2000}
          />

          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="calculator-outline"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter quantity"
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                value={deliveryDetails.quantity}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, quantity: text })
                }
              />
            </View>
          </View>

          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="camera-outline" size={24} color="#fff" />
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <Text style={styles.sectionTitle}>Digital Signature</Text>
            {!showSignaturePad ? (
              <View style={styles.signatureContainer}>
                {signature ? (
                  <View style={styles.signaturePreview}>
                    <Image
                      source={{ uri: signature }}
                      style={styles.signatureImage}
                      resizeMode="contain"
                    />
                    <View style={styles.signatureActions}>
                      <TouchableOpacity
                        style={styles.signatureActionButton}
                        onPress={() => setShowSignaturePad(true)}
                      >
                        <Icon name="create-outline" size={18} color="#4A90E2" />
                        <Text style={styles.signatureActionText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.signatureActionButton}
                        onPress={clearSignature}
                      >
                        <Icon name="trash-outline" size={18} color="#EF4444" />
                        <Text style={[styles.signatureActionText, styles.signatureActionTextDanger]}>
                          Clear
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.signaturePrompt}
                    onPress={() => setShowSignaturePad(true)}
                  >
                    <Icon name="create-outline" size={32} color="#6B7280" />
                    <Text style={styles.signaturePromptText}>Tap to Sign</Text>
                    <Text style={styles.signaturePromptSubtext}>Add your digital signature</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.signaturePadContainer}>
                <SignatureScreen
                  ref={signatureRef}
                  onOK={handleSignature}
                  onEmpty={handleEmpty}
                  descriptionText="Sign above"
                  clearText="Clear"
                  confirmText="Save"
                  webStyle={signatureWebStyle}
                  autoClear
                  imageType="image/png"
                />
                <TouchableOpacity
                  style={styles.cancelSignatureButton}
                  onPress={() => setShowSignaturePad(false)}
                >
                  <Text style={styles.cancelSignatureText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Location Button */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => navigation.navigate('MapScreen')}
          >
            <Icon name="navigate-outline" size={24} color="#fff" />
            <Text style={styles.locationText}>Capture Current Location</Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Creating...' : 'Create Delivery Note'}
            </Text>
            <Icon
              name="checkmark-circle-outline"
              size={24}
              color="#fff"
              style={styles.submitIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitleContainer: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  uploadButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signatureSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  signatureContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  signaturePrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  signaturePromptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  signaturePromptSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  signaturePreview: {
    padding: 15,
  },
  signatureImage: {
    width: '100%',
    height: 100,
  },
  signatureActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  signatureActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  signatureActionText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#4A90E2',
  },
  signaturePadContainer: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  signatureActionTextDanger: {
    color: '#EF4444',
  },
  cancelSignatureButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelSignatureText: {
    color: '#6B7280',
    fontSize: 14,
  },
  locationButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitIcon: {
    marginLeft: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
});

export default DeliveryNoteScreen;
