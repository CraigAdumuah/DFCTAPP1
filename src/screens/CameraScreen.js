import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const camera = useRef(null);
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const takePicture = async () => {
    if (camera.current) {
      try {
        setIsProcessing(true);
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'quality',
          flash: 'auto',
        });

        // Navigate to the results screen with the photo path
        navigation.navigate('FoodResult', {
          photoPath: photo.path,
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device="back"
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          >
            <Text style={styles.captureText}>Take Photo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    width: 150,
    alignItems: 'center',
  },
  captureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CameraScreen; 