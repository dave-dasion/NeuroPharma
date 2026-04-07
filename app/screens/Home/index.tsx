import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = () => {
  // Action for each button
  const handlePress = (buttonName) => {
    alert(`You pressed ${buttonName}`);
  };

  return (
    <View style={styles.container}>
      {/* First Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Button 1')}>
        <Text style={styles.buttonText}>Item 1</Text>
      </TouchableOpacity>

      {/* Second Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Button 2')}>
        <Text style={styles.buttonText}>Item 2</Text>
      </TouchableOpacity>

      {/* Third Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Button 3')}>
        <Text style={styles.buttonText}>Item 3</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
