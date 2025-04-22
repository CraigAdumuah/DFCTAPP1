import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as api from '../services/api';

const DiaryScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [foodEntries, setFoodEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    if (isFocused) {
      loadFoodEntries();
    }
  }, [isFocused]);

  const loadFoodEntries = async () => {
    try {
      setIsLoading(true);
      const today = new Date();
      const data = await api.getFoodEntries(
        today.toISOString().split('T')[0],
        today.toISOString()
      );
      setFoodEntries(data);
      const summary = await api.getDailySummary();
      setTotalCalories(summary.totalCalories);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load food entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to logout');
    }
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.foodImage}
        defaultSource={require('../assets/placeholder-food.png')}
      />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.calories}>{item.calories} calories</Text>
        <Text style={styles.mealType}>
          {item.mealType.charAt(0).toUpperCase() + item.mealType.slice(1)}
        </Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Food Diary</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.caloriesSummary}>
          <Text style={styles.summaryText}>
            Today's Total: {totalCalories} calories
          </Text>
        </View>
      </View>

      {foodEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No food entries yet today.{'\n'}Take a photo to get started!
          </Text>
        </View>
      ) : (
        <FlatList
          data={foodEntries}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          refreshing={isLoading}
          onRefresh={loadFoodEntries}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>
    </View>
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
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  caloriesSummary: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  list: {
    flex: 1,
  },
  foodItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calories: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  mealType: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DiaryScreen; 