const styles = StyleSheet.create({
  // ... existing styles ...
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 17,
  },
  addButton: {
    backgroundColor: '#007AFF',
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 16, // Account for iOS home indicator
    right: 16,
    width: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
}); 