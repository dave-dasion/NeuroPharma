import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

import { NavStatelessComponent } from "interfaces";
import { Button } from "components";
import { Colors } from "style";

import navigationOptions from "./RemainderScreen.navigationOptions";
import styles from "./RemainderScreen.styles";

const RemainderScreen = ({ navigation }) => {
  const bottomSheetAddNewRemainderRef = useRef<any>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [RemainderList, setRemainderList] = useState([]);
  const [text, setText] = useState("");

  const openBottomSheet = () => {
    setText("");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    if (bottomSheetAddNewRemainderRef.current) {
      bottomSheetAddNewRemainderRef.current.open();
    }
  };
  
  useEffect(() => {
    navigation.setOptions(navigationOptions(openBottomSheet));
  }, [navigation]);
  
  const handleChange = (inputText) => {
    setText(inputText);
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please enable notifications in settings.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    requestPermissions();
    loadData();
  }, []);

  // Function to load data from AsyncStorage
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("RemainderList");
      if (storedData !== null) {
        setRemainderList(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const getCombinedDateTime = () => {
    const dateObj = new Date(selectedDate);
    const timeObj = new Date(selectedTime);

    // Extract Date parts
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    // Extract Time parts
    const hours = timeObj.getHours();
    const minutes = timeObj.getMinutes();
    const seconds = timeObj.getSeconds();

    // Combine into a new Date object
    return new Date(year, month, day, hours, minutes, seconds);
  };

  const addRemainder = async (title: string, date: string, time: string) => {
    const notificationDateTime = getCombinedDateTime();

    console.log(notificationDateTime.toLocaleString());

    const now = new Date();
    if (text === "") {
      alert("Please enter reminder title.");
      return;
    }

    if (notificationDateTime <= now) {
      alert("Please select a future date and time!");
      return;
    }

    try {
      const newItem = {
        title: title,
        date: date,
        time: time,
        id: Date.now().toString() + Math.floor(Math.random() * 1000),
      };

      const updatedData = [...RemainderList, newItem]; // Add new object to array
      setRemainderList(updatedData);
      await AsyncStorage.setItem("RemainderList", JSON.stringify(updatedData));
      sendNotification(notificationDateTime, title);
      bottomSheetAddNewRemainderRef.current?.close();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDatePickerOpen = () => {
    setDatePickerVisible(true);
    setTimePickerVisible(false);
  };

  const handleTimePickerOpen = () => {
    setTimePickerVisible(true);
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  const sendNotification = async (notificationDateTime: any, body: string) => {
    console.log("notificationDateTime", notificationDateTime);
    console.log("body", body);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: body,
        sound: "default",
      },
      trigger: {
        date: notificationDateTime,
      },
    });
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        handleDelete(id);
      }}
    >
      <MaterialCommunityIcons name="delete" color="white" size={24} />
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const handleDelete = (id) => {
    setRemainderList((prevData) => {
      const updatedList = prevData.filter((item) => item.id !== id);
      setRemainderList(updatedList);
      updateAsyncArray(updatedList);
      return updatedList;
    });
  };

  const updateAsyncArray = async (updatedList: any) => {
    await AsyncStorage.setItem("RemainderList", JSON.stringify(updatedList));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <MaterialCommunityIcons name="bell-outline" size={80} color="#E0E0E0" />
      <Text style={styles.emptyStateTitle}>No Reminders Yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Tap the + button to create your first reminder
      </Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          data={RemainderList}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={RemainderList.length === 0 ? styles.emptyListContainer : styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => {
            return (
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View style={styles.reminderCard}>
                  <View style={styles.reminderIconContainer}>
                    <MaterialCommunityIcons name="bell" size={24} color={Colors.AppColor} />
                  </View>
                  <View style={styles.reminderContent}>
                    <Text style={styles.reminderTitle}>{item.title}</Text>
                    <View style={styles.reminderDetails}>
                      <View style={styles.dateTimeRow}>
                        <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                        <Text style={styles.reminderDate}>{item.date}</Text>
                      </View>
                      <View style={styles.dateTimeRow}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                        <Text style={styles.reminderTime}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.swipeIndicator}>
                    <Text style={styles.swipeText}>Swipe left</Text>
                    <MaterialCommunityIcons name="chevron-left" size={16} color="#ccc" />
                  </View>
                </View>
              </Swipeable>
            );
          }}
        />
      </GestureHandlerRootView>
      
      <RBSheet
        ref={bottomSheetAddNewRemainderRef}
        draggable={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
        height={420}
      >
        <View style={styles.bottomSheetView}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.dragHandle} />
            <TouchableOpacity
              onPress={() => bottomSheetAddNewRemainderRef.current.close()}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons name="close" color="#666" size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomSheetTitle}>Create New Reminder</Text>

          <TextInput
            style={styles.titleInput}
            onChangeText={handleChange}
            value={text}
            placeholder="What would you like to be reminded about?"
            placeholderTextColor="#999"
            multiline={true}
            maxLength={100}
          />

          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              onPress={() => handleDatePickerOpen()}
              style={styles.dateTimeButton}
            >
              <View style={styles.dateTimeIconContainer}>
                <MaterialCommunityIcons name="calendar" color={Colors.AppColor} size={24} />
              </View>
              <View style={styles.dateTimeTextContainer}>
                <Text style={styles.dateTimeLabel}>Date</Text>
                <Text style={styles.dateTimeValue}>
                  {selectedDate?.toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleTimePickerOpen()} 
              style={styles.dateTimeButton}
            >
              <View style={styles.dateTimeIconContainer}>
                <MaterialCommunityIcons name="clock-outline" color={Colors.AppColor} size={24} />
              </View>
              <View style={styles.dateTimeTextContainer}>
                <Text style={styles.dateTimeLabel}>Time</Text>
                <Text style={styles.dateTimeValue}>
                  {selectedTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              addRemainder(
                text,
                selectedDate?.toLocaleDateString(),
                selectedTime?.toLocaleTimeString()
              );
            }}
            style={styles.addButton}
          >
            <MaterialCommunityIcons name="plus" color="white" size={20} />
            <Text style={styles.addButtonText}>Add Reminder</Text>
          </TouchableOpacity>
        </View>
        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
        {/* DateTimePicker Modal for Time */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisible(false)}
        />
      </RBSheet>
    </View>
  );
};

RemainderScreen.navigationOptions = navigationOptions();
export default RemainderScreen;