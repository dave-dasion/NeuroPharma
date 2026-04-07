import React from "react";
import { ScrollView, View } from "react-native";

import { Text, StickersImage } from "components";
import { t } from "utils";
import { NavStatelessComponent } from "interfaces";

import styles from "./AboutScreen.styles";
import navigationOptions from "./AboutScreen.navigationOptions";

const AboutScreen: NavStatelessComponent = () => (
  <ScrollView style={styles.container}>
    <StickersImage sticker="earth" />

    <Text.Tertiary>
      Loneliness is a growing concern among seniors, with 57% reporting feelings of isolation,
      according to a 2024 Medicare report. Beyond emotional distress, loneliness has been linked to
      serious health risks and financial burdens. Recent studies have shown that AI-driven solutions
      can play a crucial role in addressing this issue, offering companionship and support to the
      aging population.
    </Text.Tertiary>
    <View style={styles.separator} />
    <Text.H3>Dasion is Fighting Loneliness in ElderCare</Text.H3>

    <Text.Tertiary>
      Dasion’s innovative ElderCare solution, Daisy, is designed to bring comfort, connection, and
      care to seniors while also assisting their caregivers. With Geometric Unified Learning, Daisy
      offers an engaging and personalized experience. Users can even select an avatar that resembles
      a family member, making interactions feel more natural and familiar.
    </Text.Tertiary>
    <View style={styles.separator} />
    <Text.Tertiary>
      Daisy does more than just provide companionship. It keeps caregivers informed by tracking key
      changes in a senior’s well-being, such as mood shifts, medical concerns, or simple needs—like
      a reminder that a loved one needs new slippers. Daisy also encourages cognitive engagement by
      suggesting games and activities that promote memory retention and mental stimulation.
    </Text.Tertiary>
    <View style={styles.separator} />
    <Text.Tertiary>
      By bridging the gap between seniors and their caregivers, Dasion is helping to redefine
      eldercare, ensuring that no one has to face aging alone.
    </Text.Tertiary>
    <View style={styles.separator} />

    {/* <Text.Primary style={styles.header}>{t("ABOUT_SCREEN_INTRO")}</Text.Primary>
    <Text.H2 style={styles.header}>{t("ABOUT_SCREEN_CARE_HEADER")}</Text.H2>
    <Text.H3 style={styles.subHeader}>{t("ABOUT_SCREEN_PRIVACY")}</Text.H3>
    <Text.Primary>{t("ABOUT_SCREEN_PRIVACY_BODY")}</Text.Primary>
    <Text.H3 style={styles.subHeader}>{t("ABOUT_SCREEN_ETHIC")}</Text.H3>
    <Text.Primary>{t("ABOUT_SCREEN_ETHIC_BODY")}</Text.Primary>
    <Text.H3 style={styles.subHeader}>{t("ABOUT_SCREEN_OPEN_SOURCE")}</Text.H3>
    <Text.Primary>{t("ABOUT_SCREEN_OPEN_SOURCE_BODY")}</Text.Primary>
    <Text.H2 style={styles.header}>{t("ABOUT_SCREEN_LIBRARIES_AND_CONTRIBUTORS")}</Text.H2>
    <View style={styles.githubView}>
      <Text.Primary>{t("ABOUT_SCREEN_CAN_BE_FOUND")}</Text.Primary>
      <Text.Link url="https://github.com/NMF-earth/nmf-app">{t("ABOUT_SCREEN_GITHUB")}</Text.Link>
    </View> */}
    <View style={styles.separator} />
  </ScrollView>
);

AboutScreen.navigationOptions = navigationOptions;

export default AboutScreen;
