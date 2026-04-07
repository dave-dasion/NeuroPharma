import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

const ElderlyCareSchedule = () => {
  const navigation = useNavigation();

  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     try {
  //       const { status } = await Audio.requestPermissionsAsync();
  //       console.log("status", status);
  //       setHasPermission(status === 'granted');
  //     } catch (error) {
  //       console.error('Permission error:', error);
  //       setHasPermission(false);
  //     }
  //   };

  //   getPermissions();
  // }, []);



  const startRecording = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please enable microphone permissions to record audio.');
      return;
    }

    try {
      // await Audio.setAudioModeAsync({
      //   allowsRecordingIOS: true,  // Enable recording on iOS
      //   playsInSilentModeIOS: true,  // Allow playback even if the phone is in silent mode
      //   staysActiveInBackground: true,  // Keep the audio mode active in the background
      //   // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,  // Handle audio interruptions gracefully
      //   // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      //   shouldDuckAndroid: false,
      // });

      // const { recording } = await Audio.Recording.createAsync(
      //   Audio.RecordingOptionsPresets.HIGH_QUALITY
      // );



      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setSound(uri); // Set the URI here, not the playback sound object
      setIsRecording(false);
      setRecording(null);
      console.log('Recording stopped:', uri);
    }
  };

const playSound = async () => {
    if (sound) {
      try {
        // const { sound: playbackSound } = await Audio.Sound.createAsync(
        //   { uri: sound },
        //   { shouldPlay: true }
        // );
        setIsPlaying(true); // Mark sound as playing

        // await playbackSound.playAsync();

        // // Release the playback sound after playing
        // playbackSound.setOnPlaybackStatusUpdate(async (status) => {
        //   if (status.didJustFinish) {
        //     await playbackSound.unloadAsync(); // Clean up after playback
        //     setIsPlaying(false); // Mark sound as stopped
        //   }
        // });
        setIsPlaying(false);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */} 
      <View style={{ height: 25 }} />
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Voice to Schedule</Text>
        </View>

        {/* Voice Input Section */}
        {/* <LinearGradient colors={["#fff", "#fff"]} style={styles.micContainer}> */}
        <View style={{ height: 30 }} />
        <TouchableOpacity style={styles.micContainer} activeOpacity={0.9} onPress={() => startRecording()}>
          <View style={styles.rowView}>
            <View style={styles.micViewStyle}>
              <Image style={styles.microphoneIcon} source={isRecording ? require('../../../assets/images/microphone.png') : require('../../../assets/images/mike.png')} />
            </View>
            {sound && (
              <TouchableOpacity onPress={playSound} >
                {isPlaying ?
                  <Image style={styles.playIcon} source={require('../../../assets/images/pause.png')} /> :
                  <Image style={styles.playIcon} source={require('../../../assets/images/play.png')} />
                }
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 10 }} />
          <Text style={styles.micText}>Press to speak</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
        <View style={{ height: 10 }} />
        {/* Stop and Cancel Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => stopRecording()}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }} />
        {/* AI Scheduling Section */}
        <View style={styles.aiSchedulingContainer}>
          <View style={styles.rightArrowViewStyle}>
            <Text style={styles.aiSchedulingTitle}>AI scheduling</Text>
            <Icon name="arrow-forward" size={24} color="#000" style={{ marginLeft: 15 }} />
          </View>
          <View style={{ height: 10 }} />
          <TouchableOpacity style={styles.scheduleCard}>
            <View>
              <Text style={styles.scheduleName}>Dr. Melisa Meyers</Text>
              <View style={{ height: 10 }} />
              <Text style={styles.scheduleTime}>Tue Jan 12 2pm</Text>
            </View>
            {/* <Icon name="chevron-forward" size={24} color="#000" /> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Bottom Navigation Bar */}
      {/* <View style={styles.bottomNav}>
        <Icon name="home" size={25} color="#ff8c00" />
        <Icon name="document-text-outline" size={25} color="#b0b0b0" />
        <Icon name="bar-chart-outline" size={25} color="#b0b0b0" />
        <Icon name="person-outline" size={25} color="#b0b0b0" />
      </View> */}
    </View>
  );
};

export default ElderlyCareSchedule;
