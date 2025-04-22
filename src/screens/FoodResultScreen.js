const styles = StyleSheet.create({
  // ... existing styles ...
  saveButton: {
    backgroundColor: '#007AFF',
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 34 : 16, // Account for iOS home indicator
  },
  activityIndicator: {
    color: Platform.OS === 'ios' ? '#007AFF' : '#000',
  }
}); 