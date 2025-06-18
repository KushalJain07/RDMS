import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type UserRole = 'Driver' | 'Supplier';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Driver');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [contentOpacity] = useState(new Animated.Value(1));

  const handleLogin = () => {
    if (selectedRole === 'Driver') {
      navigation.navigate('Driver_Dashboard');
    } else if (selectedRole === 'Supplier') {
      navigation.navigate('TabNavigator');
    }
  };

  const handleForgotPassword = () => {
    setIsModalVisible(true);
  };

  const switchRole = (role: UserRole) => {
    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedRole(role);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../public/images/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Heading */}
        <Text style={styles.signInHeading}>Sign in</Text>

        {/* Role Toggle */}
        <View style={styles.toggleContainer}>
          {['Driver', 'Supplier'].map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.toggleButton,
                selectedRole === role && styles.toggleButtonSelected,
              ]}
              onPress={() => switchRole(role as UserRole)}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedRole === role && styles.toggleButtonTextSelected,
                ]}
              >
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Animated Login Form */}
        <Animated.View style={{ opacity: contentOpacity }}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          {selectedRole === 'Supplier' && (
            <>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>

              <Text style={styles.link}>Sign up</Text>
            </>
          )}
        </Animated.View>
      </View>

      {/* Forgot Password Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.modalMessage}>
              Sorry, I think there is no way around this!
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 20,
  },
  container: {
    padding: 30,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4F46E5',
    backgroundColor: '#fff',
  },
  signInHeading: {
    alignSelf: 'center',
    color: '#1F2937',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  toggleButtonSelected: {
    backgroundColor: '#4F46E5',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  toggleButtonTextSelected: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  loginButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  link: {
    textAlign: 'center',
    color: '#4F46E5',
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
