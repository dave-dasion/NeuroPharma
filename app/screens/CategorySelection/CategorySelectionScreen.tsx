import React from "react";
import { ScrollView, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { navigate } from "navigation";
import { EmissionType, NavStatelessComponent } from "interfaces";
import { Text, Tag } from "components";
import { t, ui } from "utils";

import { categories } from "./categoryList";
import navigationOptions from "./CategorySelectionScreen.navigationOptions";
import styles from "./CategorySelectionScreen.styles";
 
const CategorySelectionScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const onPress = ({ emissionType }) => {
    if (emissionType === EmissionType.custom || emissionType === EmissionType.electricity) {
      navigator.openAddEmission({ emissionType });
    } else if (emissionType === EmissionType.productScanned) {
      navigator.openBarCodeScan({ emissionType });
    } else {
      navigator.openSubCategorySelection({ emissionType });
    }
  };

  return (
    <>
      <View style={styles.rowView}>
        <Image
          style={styles.appLogoStyle}
          source={require("../../../assets/images/LOGO_blue.png")}
        />
        <Image
          style={styles.appBannerStyle}
          source={require("../../../assets/images/Logo_banner.png")}
        />
      </View>
      <ScrollView style={styles.container} >
        {/* <Text.H2 style={styles.info}>{t("CATEGORY_SELECTION_SCREEN_SELECT_CATEGORY")}</Text.H2> */}
        {categories.map((category, index) => (
          <Tag
            key={index}
            icon={category.icon}
            text={ui.getTranslationEmissionType(category.emissionType)}
            onPress={() => onPress(category)}
            iscustomImge={category.iscustomImge}
          />
        ))}
        <View style={styles.separator}></View>
      </ScrollView>
    </>
  );
};

CategorySelectionScreen.navigationOptions = navigationOptions;

export default CategorySelectionScreen;
