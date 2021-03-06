import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { Card,Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      time: new Date(),
      show: false,
      showModal: false,
      mode: "date",
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    // this.toggleModal();
    Alert.alert('Your Reservation OK?'
    ,'Number of Guests: '+this.state.guests+'\n Smoking? '+ this.state.smoking+ '\n Date and Time: '+this.state.date,
    [
      {
        text:'Cancel',
        onPress:()=>this.resetForm(),
        style:'cancel'
      },
      {
        text:'OK',
        onPress:()=>{
          this.presentLocalNotification(this.state.date)
          this.addReservationToCalendar(this.state.date);
          this.resetForm()



        }
      }
    ],
    {cancelable:false}
    )

  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      time: new Date(),
      show: false,
      showModal: false,
      mode: "date",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: 'Reservation for '+ date + ' requested',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            color: '#512DA8'
        }
    });
  }


  async obtainCalendarPermission(){
    let calendarPermission = await Permissions.getAsync(Permissions.CALENDAR);
    if(calendarPermission.status != 'granted'){
     calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
     if(calendarPermission.status != 'granted'){
        Alert.alert('Permission not granted to add calendar event!')
    }

  }
  return calendarPermission
}

async  getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync();
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
}

async addReservationToCalendar(date){
  await this.obtainCalendarPermission();
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Con Fusion Table Reservation',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
  Calendar.createEventAsync(newCalendarID,{
    title:'Con Fusion Table Reservation',
    startDate:new Date(Date.parse(date)),
    endDate: new Date(Date.parse(date)+ 2*60*60*1000),
    timeZone:'Asia/Hong_Kong',
    location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
  })

}

  render() {
    const showDatepicker = () => {
      this.setState({ show: true });
    };
    return (
      <ScrollView>
        <Animatable.View animation='zoomIn' duration={2000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={this.state.smoking}
            trackColor="#512DA8"
            onValueChange={(value) => this.setState({ smoking: value })}
          ></Switch>
        </View>
        <View style={styles.formRow}>
            
        <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity style={styles.formItem}
                    style={{
                        padding: 7,
                        borderColor: '#512DA8',
                        borderWidth: 2,
                        flexDirection: "row"
                        }}
                    onPress={showDatepicker}
                    >
                    <Icon type='font-awesome' name='calendar' color='#512DA8' />
                    <Text >
                    {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                    </Text>
                    </TouchableOpacity>
          {/* <Text style={styles.formLabel}>Date and Time</Text> */}
          {/* <Text style={styles.formItem} onPress={showDatepicker}> */}
            {/* {this.state.date.toDateString()} {this.state.time.toTimeString()} */}
          {/* </Text> */}
          {this.state.show && (
            <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              display="default"
              minimumDate={new Date()}
              onChange={(selected, value) => {
                if (value !== undefined) {
                  this.setState({
                    show: this.state.mode === "time" ? false : true,
                    mode: "time",
                    date: new Date(selected.nativeEvent.timestamp),
                    time: new Date(selected.nativeEvent.timestamp),
                  });
                } else {
                  this.setState({ show: false });
                }
              }}
            />
          )}
        </View>
        <View style={styles.formRow}>
          <Button
            onPress={() => this.handleReservation()}
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        </Animatable.View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Reservation</Text>
            <Text style={styles.modalText}>
              Number of Guests: {this.state.guests}
            </Text>
            <Text style={styles.modalText}>
              Smoking?: {this.state.smoking ? "Yes" : "No"}
            </Text>
            <Text style={styles.modalText}>
              Date: {this.state.date.toDateString()}
            </Text>
            <Text style={styles.modalText}>
              Time: {this.state.time.toTimeString()}
            </Text>

            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="#512DA8"
              title="Close"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
