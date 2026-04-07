import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  useWindowDimensions, 
  Animated,
  Platform // Added Platform
} from "react-native";

import { Colors } from "style";
import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./BillingDetails.navigationOptions";

interface BillingDetail {
  cpt4?: string;
  icd10?: string;
  copay?: string;
  amount: string;
  name: string;
  units: string;
  date: string;
}

interface BillingItem {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  details: BillingDetail[];
}

const BillingDetails: NavStatelessComponent = () => {
  const route = useRoute<any>();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Reset and Start animation every time the component visits/mounts
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const { billingItem }: { billingItem: BillingItem } = route.params || {};
  
  if (!billingItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No billing information found</Text>
      </View>
    );
  }

  const totalAmount = billingItem.details.reduce((sum, detail) => {
    return sum + (parseFloat(detail.amount) || 0);
  }, 0);

  const totalCopay = billingItem.details.reduce((sum, detail) => {
    return sum + (parseFloat(detail.copay) || 0);
  }, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderDetailItem = (detail: BillingDetail, index: number) => {
    return (
      <View 
        key={index} 
        style={[
          styles.detailCard, 
          isTablet ? styles.tabletCard : styles.mobileCard
        ]}
      >
        <View style={styles.detailHeader}>
          <View style={styles.badgeRow}>
            {detail.cpt4 && (
              <View style={[styles.cptBadge, isTablet && { padding: 8 }]}>
                <Text style={[styles.badgeText, isTablet && { fontSize: 14 }]}>CPT: {detail.cpt4}</Text>
              </View>
            )}
            {detail.icd10 && (
              <View style={[styles.icdBadge, isTablet && { padding: 8 }]}>
                <Text style={[styles.badgeText, isTablet && { fontSize: 14 }]}>ICD: {detail.icd10}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.amountValue, isTablet && { fontSize: 24 }]}>${parseFloat(detail.amount).toFixed(2)}</Text>
        </View>

        <View style={[styles.detailBody, isTablet && { gap: 8 }]}>
          <Text style={[styles.detailSubText, isTablet && { fontSize: 16 }]}>Provider: {billingItem.doctorName}</Text>
          <Text style={[styles.detailSubText, isTablet && { fontSize: 16 }]}>Date: {formatDate(detail.date)}</Text>
          <View style={[styles.unitRow, isTablet && { paddingTop: 12 }]}>
            <Text style={[styles.detailSubText, isTablet && { fontSize: 16 }]}>Units: {detail.units}</Text>
            {detail.copay && parseFloat(detail.copay) > 0 && (
              <Text style={[styles.copayText, isTablet && { fontSize: 16 }]}>Copay: ${parseFloat(detail.copay).toFixed(2)}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        
        {/* Modern Header Section */}
        <View style={[styles.headerCard, isTablet && styles.tabletHeader]}>
          <View>
            <Text style={[styles.patientName, isTablet && { fontSize: 36 }]}>{billingItem.patientName}</Text>
            <Text style={[styles.visitDate, isTablet && { fontSize: 18 }]}>Visit: {formatDate(billingItem.date)}</Text>
          </View>
          <View style={[styles.doctorChip, isTablet && { paddingHorizontal: 20, paddingVertical: 10 }]}>
            <Text style={[styles.doctorChipText, isTablet && { fontSize: 16 }]}>Dr. {billingItem.doctorName.split(" ").pop()}</Text>
          </View>
        </View>

        <View style={[styles.sectionHeader, isTablet && { paddingHorizontal: 32, marginVertical: 20 }]}>
          <Text style={[styles.sectionTitle, isTablet && { fontSize: 24 }]}>Service Details</Text>
          <View style={[styles.countBadge, isTablet && { paddingHorizontal: 12, borderRadius: 14 }]}>
             <Text style={[styles.countText, isTablet && { fontSize: 16 }]}>{billingItem.details.length}</Text>
          </View>
        </View>

        {/* Dynamic Grid Layout */}
        <View style={isTablet ? styles.tabletGrid : styles.mobileGrid}>
          {billingItem.details.map(renderDetailItem)}
        </View>

        {/* Enhanced Summary Section */}
        <View style={[styles.summaryCard, isTablet && styles.tabletSummary]}>
          <Text style={[styles.summaryTitle, isTablet && { fontSize: 24, marginBottom: 20 }]}>Total Summary</Text>
          <View style={styles.summaryDivider} />
          
          <View style={[styles.summaryRow, isTablet && { marginBottom: 15 }]}>
            <Text style={[styles.summaryLabel, isTablet && { fontSize: 18 }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, isTablet && { fontSize: 18 }]}>${totalAmount.toFixed(2)}</Text>
          </View>

          {totalCopay > 0 && (
            <View style={[styles.summaryRow, isTablet && { marginBottom: 15 }]}>
              <Text style={[styles.summaryLabel, isTablet && { fontSize: 18 }]}>Total Copay</Text>
              <Text style={[styles.summaryValue, isTablet && { fontSize: 18, color: "#e74c3c" }]}>-${totalCopay.toFixed(2)}</Text>
            </View>
          )}

          <View style={[styles.totalContainer, isTablet && { marginTop: 25, paddingTop: 25 }]}>
            <Text style={[styles.totalLabel, isTablet && { fontSize: 28 }]}>Total Due</Text>
            <Text style={[styles.totalValue, isTablet && { fontSize: 32 }]}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  headerCard: {
    backgroundColor: "#2D3436",
    margin: 16,
    padding: 24,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 0 : 10, // Removed shadow for Android
  },
  tabletHeader: {
    marginHorizontal: 32,
    marginTop: 32,
    padding: 40,
  },
  patientName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  visitDate: {
    fontSize: 14,
    color: "#BDC3C7",
    marginTop: 4,
  },
  doctorChip: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  doctorChipText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
  },
  countBadge: {
    backgroundColor: "#dfe6e9",
    marginLeft: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#636e72",
  },
  mobileGrid: {
    paddingHorizontal: 16,
  },
  tabletGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
  },
  mobileCard: {
    width: "100%",
  },
  tabletCard: {
    width: "47%",
    margin: "1.5%",
    padding: 24,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E1E8EE",
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
  },
  cptBadge: {
    backgroundColor: "#E3F2FD",
    padding: 5,
    borderRadius: 6,
    marginRight: 6,
  },
  icdBadge: {
    backgroundColor: "#F3E5F5",
    padding: 5,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1976D2",
  },
  amountValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2ECC71",
  },
  detailBody: {
    gap: 4,
  },
  detailSubText: {
    fontSize: 13,
    color: "#636e72",
  },
  unitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: "#f1f2f6",
    paddingTop: 8,
  },
  copayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e74c3c",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    padding: 24,
    borderRadius: 20,
    borderTopWidth: 5,
    borderTopColor: "#2ECC71",
  },
  tabletSummary: {
    marginHorizontal: 32,
    marginTop: 40,
    marginBottom: 40,
    padding: 40,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#f1f2f6",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#636e72",
    fontSize: 15,
  },
  summaryValue: {
    fontWeight: "600",
    fontSize: 15,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    borderTopColor: "#dfe6e9",
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#2ECC71",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    color: "#e74c3c",
  },
});

BillingDetails.navigationOptions = navigationOptions;

export default BillingDetails;