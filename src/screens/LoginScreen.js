import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    height: 44, // iOS standard height
    borderRadius: 10,
    backgroundColor: '#F2F2F7', // iOS light gray
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#007AFF', // iOS blue
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 17,
  }
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Rest of the component code */}
    </View>
  );
};

export default LoginScreen; 