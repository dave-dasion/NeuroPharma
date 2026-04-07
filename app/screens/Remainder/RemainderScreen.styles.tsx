import { StyleSheet } from "react-native";
import { Colors, Layout } from "style";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  
  reminderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: Colors.AppColor,
  },
  
  reminderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.AppColor + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  reminderContent: {
    flex: 1,
  },
  
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  
  reminderDetails: {
    gap: 4,
  },
  
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  
  reminderDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  
  reminderTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  
  swipeIndicator: {
    alignItems: 'center',
    opacity: 0.4,
  },
  
  swipeText: {
    fontSize: 10,
    color: '#ccc',
    marginBottom: 2,
  },
  
  deleteButton: {
    backgroundColor: '#FF4757',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginVertical: 6,
    marginRight: 16,
  },
  
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },
  
  bottomSheetView: {
    padding: 20,
    paddingTop: 0,
  },
  
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
  },
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  
  titleInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  
  dateTimeButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  dateTimeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.AppColor + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  dateTimeTextContainer: {
    flex: 1,
  },
  
  dateTimeLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  dateTimeValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  
  addButton: {
    backgroundColor: Colors.AppColor,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.AppColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  RightTextStyle: {
    fontSize: 30,
    fontWeight: "800",
  },
});

export default styles;