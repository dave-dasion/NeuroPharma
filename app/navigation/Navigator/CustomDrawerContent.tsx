import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('REFRESH_TOKEN');
    (navigation as any).reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const navItems = [
    { label: 'DASHBOARD', icon: 'view-dashboard', type: 'material', screen: 'Dashboard' },
    { label: 'LEARNING HUB', icon: 'book-open-page-variant', type: 'material', screen: 'LearningHub' },
    { label: 'AI COPILOT', icon: 'robot', type: 'material', screen: 'AICopilot' },
    { label: 'DRUG DISCOVERY LAB', icon: 'pill', type: 'material', screen: 'DrugDiscovery' },
    { label: 'BIOLOGY & MOLECULAR STUDIO', icon: 'dna', type: 'material', screen: 'BiologyStudio' },
    { label: 'QUANTUM & MATERIALS LAB', icon: 'atom', type: 'material', screen: 'QuantumLab' },
    { label: 'CLINICAL CASE SIMULATOR', icon: 'hospital-box', type: 'material', screen: 'ClinicalSimulator' },
    { label: 'ANNOTATION & FEEDBACK LAB', icon: 'comment-edit', type: 'material', screen: 'AnnotationLab' },
    { label: 'COMMUNICATION TRAINING', icon: 'account-voice', type: 'material', screen: 'CommTraining' },
    { label: 'RESEARCH NOTEBOOK', icon: 'notebook-edit', type: 'material', screen: 'ResearchNotebook' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Drawer Header */}
        <LinearGradient
          colors={['#0a0e27', '#1a1f4e']}
          style={styles.drawerHeader}
        >
          <View style={styles.profileContainer}>
             <View style={styles.avatarContainer}>
                <Ionicons name="flask" size={30} color="#fff" />
             </View>
             <View style={styles.userInfo}>
                <Text style={styles.userName}>NeuroPharma</Text>
                <Text style={styles.userRole}>Lab Intelligence</Text>
             </View>
          </View>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeBtn}>
             <Ionicons name="close" size={24} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.navContainer}>
          {navItems.map((item, index) => {
            const isFocused = props.state.routeNames[props.state.index] === item.screen;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => props.navigation.navigate(item.screen)}
                style={[
                  styles.navItem,
                  isFocused && styles.navItemActive
                ]}
              >
                <View style={[styles.iconBox, isFocused && styles.iconBoxActive]}>
                   <MaterialCommunityIcons 
                      name={item.icon as any} 
                      size={20} 
                      color={isFocused ? '#fff' : '#595D58'} 
                   />
                </View>
                <Text style={[styles.navLabel, isFocused && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Logout Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  userRole: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  closeBtn: {
    top: -25,
  },
  navContainer: {
    paddingHorizontal: 15,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#0a0e27',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconBoxActive: {
    backgroundColor: '#1a1f4e',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#595D58',
    letterSpacing: 0.5,
  },
  navLabelActive: {
    color: '#fff',
  },
  footerContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  }
});

export default CustomDrawerContent;
