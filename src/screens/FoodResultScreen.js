import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as api from '../services/api';

const FoodResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { photoPath } = route.params;
  const [foodData, setFoodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    analyzeFoodImage();
  }, []);

  const analyzeFoodImage = async () => {
    try {
      setIsLoading(true);
      const result = await api.uploadFoodImage(photoPath, 'snack');
      setFoodData(result);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to analyze food');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const saveFoodEntry = async () => {
    try {
      setIsSaving(true);
      await api.saveFoodEntry({
        ...foodData,
        imageUrl: photoPath,
      });
      navigation.navigate('Diary');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save food entry');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Analyzing your food...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `file://${photoPath}` }}
        style={styles.foodImage}
      />
      
      <View style={styles.resultContainer}>
        <Text style={styles.foodName}>{foodData.name}</Text>
        <Text style={styles.confidence}>
          Confidence: {Math.round(foodData.confidence * 100)}%
        </Text>

        <View style={styles.calorieContainer}>
          <Text style={styles.calorieText}>
            {foodData.calories} calories
          </Text>
        </View>

        <View style={styles.nutritionContainer}>
          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          <View style={styles.nutritionRow}>
            <Text>Protein</Text>
            <Text>{foodData.nutritionInfo.protein}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text>Carbs</Text>
            <Text>{foodData.nutritionInfo.carbs}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text>Fat</Text>
            <Text>{foodData.nutritionInfo.fat}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text>Fiber</Text>
            <Text>{foodData.nutritionInfo.fiber}g</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveFoodEntry}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save to Diary</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  foodImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  resultContainer: {
    padding: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  confidence: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  calorieContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  calorieText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nutritionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodResultScreen; 