/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import throttle from "lodash.throttle";

const navigateOneTime = (navigate) => throttle(navigate, 1000, { trailing: false });

/* navigate */

const openAddEmissionNavigator = (navigation) => (props = {}) => {
  navigation.navigate("AddEmissionNavigator", props);
};

const openEmissions = (navigation) => (props = {}) => {
  navigation.navigate("Emissions", props);
};

/* navigate - modal */

const openInfoModal = (navigation) => (props = {}) => {
  navigation.navigate("ModalNavigator", {
    screen: "InfoModal",
    params: props,
  });
};

const openPeriodicityModal = (navigation) => (props = {}) => {
  navigation.navigate("ModalNavigator", {
    screen: "PeriodicityModal",
    params: props,
  });
};

const openComingSoonModal = (navigation) => (props = {}) => {
  navigation.navigate("ModalNavigator", {
    screen: "ComingSoonModal",
    params: props,
  });
};

/* push */

const openMontlyBudget = (navigation) => (props = {}) => {
  navigation.push("MonthlyBudget", props);
};

const openAddEmission = (navigation) => (props = {}) => {
  navigation.push("AddEmission", props);
};

const openActDetails = (navigation) => (props = {}) => {
  navigation.push("ActDetail", props);
};

const openEmissionItem = (navigation) => (props = {}) => {
  navigation.push("EmissionItem", props);
};

const openAbout = (navigation) => (props = {}) => {
  navigation.push("About", props);
};

const openMyLocation = (navigation) => (props = {}) => {
  navigation.push("MyLocation", props);
};

const openFaq = (navigation) => (props = {}) => {
  navigation.push("Faq", props);
};

const openNotifications = (navigation) => (props = {}) => {
  navigation.push("Notifications", props);
};

const openSupportUs = (navigation) => (props = {}) => {
  navigation.push("SupportUs", props);
};

const openMyData = (navigation) => (props = {}) => {
  navigation.push("MyData", props);
};

const openStorybook = (navigation) => (props = {}) => {
  navigation.push("Storybook", props);
};

const openBudget = (navigation) => (props = {}) => {
  navigation.push("Budget", props);
};

const openSubCategorySelection = (navigation) => (props = {}) => {
  navigation.push("SubCategorySelection", props);
};

const openBarCodeScan = (navigation) => (props = {}) => {
  navigation.push("BarCodeScan", props);
};

const openMonthlyEmissions = (navigation) => (props = {}) => {
  navigation.push("MonthlyEmissions", props);
};

const openLanguages = (navigation) => (props = {}) => {
  navigation.push("Languages", props);
};
 
const openRecurringEmissions = (navigation) => (props = {}) => {
  navigation.push("RecurringEmissions", props);
};
const openSpeechSummary = (navigation) => (props = {}) => {
  navigation.push("NeuroGuard", props);
};
const openTems = (navigation) => (props = {}) => {
  navigation.push("TermsScreen", props);
};

const openLoginScreen = (navigation) => (props = {}) => {
  navigation.push("Login", props);
};
const openElderlyCareHomeScreen = (navigation) => (props = {}) => {
  navigation.push("ElderlyCareHome", props);
};
const openElderlyCareScheduleScreen = (navigation) => (props = {}) => {
  navigation.push("ElderlyCareSchedule", props);
};

const openOtherDiseases = (navigation) => (props = {}) => {
  navigation.push("OtherDiseases", props);
};

const openElderlyCareOptions = (navigation) => (props = {}) => {
  navigation.push("ElderlyCareOptions", props);
};

const openAssessmentSteps = (navigation) => (props = {}) => {
  navigation.push("StapperScreen", props);
};
const openAthlete = (navigation) => (props = {}) => {
  navigation.push("Athlete", props);
};

const openRemainder = (navigation) => (props = {}) => {
  navigation.push("Reminder", props);
};

const openAssessmentSingle = (navigation) => (props = {}) => {
  navigation.push("AsessmentAISingleNotes", props);
};

const openDoctorSoapNotes = (navigation) => (props = {}) => {
  navigation.push("DoctorSOAPNotes", props);
};



const navigate = (navigation) => ({
  goBack: navigation.goBack,
  openRecurringEmissions: navigateOneTime(openRecurringEmissions(navigation)),
  openMonthlyEmissions: navigateOneTime(openMonthlyEmissions(navigation)),
  openAddEmissionNavigator: navigateOneTime(openAddEmissionNavigator(navigation)),
  openSubCategorySelection: navigateOneTime(openSubCategorySelection(navigation)),
  openMyData: navigateOneTime(openMyData(navigation)),
  openBarCodeScan: navigateOneTime(openBarCodeScan(navigation)),
  openComingSoonModal: navigateOneTime(openComingSoonModal(navigation)),
  openInfoModal: navigateOneTime(openInfoModal(navigation)),
  openPeriodicityModal: navigateOneTime(openPeriodicityModal(navigation)),
  openBudget: navigateOneTime(openBudget(navigation)),
  openMontlyBudget: navigateOneTime(openMontlyBudget(navigation)),
  openAddEmission: navigateOneTime(openAddEmission(navigation)),
  openActDetails: navigateOneTime(openActDetails(navigation)),
  openEmissionItem: navigateOneTime(openEmissionItem(navigation)),
  openAbout: navigateOneTime(openAbout(navigation)),
  openMyLocation: navigateOneTime(openMyLocation(navigation)),
  openFaq: navigateOneTime(openFaq(navigation)),
  openNotifications: navigateOneTime(openNotifications(navigation)),
  openSupportUs: navigateOneTime(openSupportUs(navigation)),
  openStorybook: navigateOneTime(openStorybook(navigation)),
  openLanguages: navigateOneTime(openLanguages(navigation)),
  openEmissions: navigateOneTime(openEmissions(navigation)),
  openSpeechSummary: navigateOneTime(openSpeechSummary(navigation)),
  openTems: navigateOneTime(openTems(navigation)),
  openLogin: navigateOneTime(openLoginScreen(navigation)),
  openElderlyCareScheduleScreen: navigateOneTime(openElderlyCareScheduleScreen(navigation)),
  openElderlyCareHomeScreen: navigateOneTime(openElderlyCareHomeScreen(navigation)),
  openOtherDisease: navigateOneTime(openOtherDiseases(navigation)),
  openElderlyCareOptions: navigateOneTime(openElderlyCareOptions(navigation)),
  openAssessmentSteps: navigateOneTime(openAssessmentSteps(navigation)),
  openAthlete: navigateOneTime(openAthlete(navigation)),
  openRemainder:navigateOneTime(openRemainder(navigation)),
  openAssessmentSingle:navigateOneTime(openAssessmentSingle(navigation)),
  openDoctorSoapNotes:navigateOneTime(openDoctorSoapNotes(navigation))


  // ElderlyCareOptions
});

export default navigate;
