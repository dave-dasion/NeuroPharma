import React, { useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Animated, useWindowDimensions, Platform } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { NavStatelessComponent } from "interfaces";
import { Colors } from "style";

import navigationOptions from "./Billing.navigationOptions";


const billingData = [
  {
    id: "1",
    patientName: "Jackie Pat",
    doctorName: "Dr. Demen Lee",
    date: "2025-04-01",
    details: [
      {
        cpt4: "99212",
        copay: "25.00",
        amount: "580.00",
        name: "Jackie Pat",
        units: "1",
        date: "2025-04-01",
      },
      {
        cpt4: "99213",
        amount: "340.00",
        name: "Jackie Pat",
        units: "1",
        date: "2025-04-01",
      },
      {
        icd10: "G23.1",
        name: "Jackie Pat",
        amount: "440.00",
        units: "1",
        date: "2025-04-01",
      },
    ]
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctorName: "Dr. Emily Johnson",
    date: "2025-04-02",
    details: [
      {
        cpt4: "99214",
        copay: "30.00",
        amount: "750.00",
        name: "Jane Smith",
        units: "1",
        date: "2025-04-02",
      },
      {
        cpt4: "99212",
        amount: "280.00",
        name: "Jane Smith",
        units: "1",
        date: "2025-04-02",
      },
      {
        icd10: "M79.3",
        name: "Jane Smith",
        amount: "180.00",
        units: "1",
        date: "2025-04-02",
      },
    ]
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctorName: "Dr. Michael Wilson",
    date: "2025-04-03",
    details: [
      {
        cpt4: "99215",
        copay: "40.00",
        amount: "950.00",
        name: "Robert Brown",
        units: "1",
        date: "2025-04-03",
      },
      {
        cpt4: "99213",
        amount: "420.00",
        name: "Robert Brown",
        units: "1",
        date: "2025-04-03",
      },
      {
        icd10: "I25.9",
        name: "Robert Brown",
        amount: "380.00",
        units: "1",
        date: "2025-04-03",
      },
    ]
  },
];

interface BillingItem {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  details: Array<{
    cpt4?: string;
    icd10?: string;
    copay?: string;
    amount: string;
    name: string;
    units: string;
    date: string;
  }>;
}

const Billing: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();

  // Layout Logic: 2 columns for Tablets (width > 768), 1 for Mobile
  const isTablet = width > 768;
  const numColumns = isTablet ? 2 : 1;

  // Animation values
  const animatedValues = useRef(billingData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (isFocused) {
      // Reset values
      animatedValues.forEach(val => val.setValue(0));
      
      // Staggered Animation
      const animations = billingData.map((_, i) => {
        return Animated.spring(animatedValues[i], {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        });
      });

      Animated.stagger(100, animations).start();
    }
  }, [isFocused]);

  const renderBillingItem = ({ item, index }: { item: BillingItem, index: number }) => {
    const totalAmount = item.details.reduce((sum, detail) => {
      return sum + (parseFloat(detail.amount) || 0);
    }, 0);

    const totalCopay = item.details.reduce((sum, detail) => {
      return sum + (parseFloat(detail.copay) || 0);
    }, 0);

    // Apply animation to the wrapper
    const animatedStyle = {
      opacity: animatedValues[index],
      transform: [
        {
          translateY: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[
        animatedStyle, 
        isTablet ? { width: "48%", marginHorizontal: "1%" } : { width: "100%" }
      ]}>
        <TouchableOpacity 
          style={[styles.itemMainContainer, isTablet && { padding: 24, borderRadius: 20, marginBottom: 20 }]} 
          activeOpacity={0.7} 
          onPress={() => navigation.navigate("BillingDetails", { billingItem: item })}
        >
          <View style={[styles.cardHeader, isTablet && { marginBottom: 15 }]}>
            <Text style={[styles.patientName, isTablet && { fontSize: 26 }]}>{item.patientName}</Text>
            <Text style={[styles.totalAmount, isTablet && { fontSize: 26 }]}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.cardBody, isTablet && { marginBottom: 15 }]}>
            <Text style={[styles.doctorName, isTablet && { fontSize: 20 }]}>{item.doctorName}</Text>
            <Text style={[styles.date, isTablet && { fontSize: 18 }]}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>

          {totalCopay > 0 && (
            <View style={[styles.copayContainer, isTablet && { marginBottom: 15 }]}>
              <Text style={[styles.copayLabel, isTablet && { fontSize: 18 }]}>Copay: </Text>
              <Text style={[styles.copayAmount, isTablet && { fontSize: 18 }]}>${totalCopay.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.detailsContainer}>
            <Text style={[styles.detailsCount, isTablet && { fontSize: 16 }]}>
              {item.details.length} item{item.details.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={isTablet ? "tablet-grid" : "mobile-list"} // Change key to force re-render on orientation change
        data={billingData}
        renderItem={renderBillingItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={isTablet ? styles.columnWrapper : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, isTablet && { padding: 32 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: "flex-start",
  },
  itemMainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 3, // Removed shadow on Android
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    flex: 1,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  doctorName: {
    fontSize: 14,
    color: "#7f8c8d",
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#95a5a6",
  },
  copayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  copayLabel: {
    fontSize: 14,
    color: "#34495e",
  },
  copayAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e74c3c",
  },
  detailsContainer: {
    alignItems: "flex-end",
  },
  detailsCount: {
    fontSize: 12,
    color: "#95a5a6",
    fontStyle: "italic",
  },
});

Billing.navigationOptions = navigationOptions();

export default Billing;