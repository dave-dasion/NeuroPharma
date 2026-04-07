import { NavStatelessComponent } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'style';
import navigationOptions from './GenerateNotes.navigationOptions';
import { useRoute } from '@react-navigation/native';

const SoapNotes: NavStatelessComponent = () => {
  const route = useRoute();
  const [deta, setDeta] = useState('')

  const { data } = route?.params;
  console.log(data, 'data&^^')
  
  useEffect(() => {
    setDeta(data)
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>
        {data}     
       </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.white
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

SoapNotes.navigationOptions = navigationOptions();



export default SoapNotes;
