import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Modal, Picker, Switch, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import DateTimePickerModal from "@react-native-community/datetimepicker";
class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDatePickerVisible:false,
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal:false,
            mode: 'date'
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }
    setDatePickerVisibility(){
        this.setState({isDatePickerVisible: !this.state.isDatePickerVisible})

    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            mode: 'date'
        });
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
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
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                {/* <Text style={styles.formLabel}>Date and Time</Text> */}
                {/* <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                value={new Date()}
                style={{flex: 2, marginRight: 20}}
                date={this.state.date}
                format=''
                mode="date time"
                placeholder="select date and Time"
                minDate="2017-01-01"
                onCancel="Cancel"
                OnChange={(date)=>{this.setState({date:date})}}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                }}
                onConfirm={(date) => {this.setState({date: date})}}
                
                /> */}
                {/* <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onConfirm={(date) => {this.setState({date: date})}}
                /> */}

                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity style={styles.formItem}
                    style={{
                        padding: 7,
                        borderColor: '#512DA8',
                        borderWidth: 2,
                        flexDirection: "row"
                        }}
                    onPress={() => this.setState({ show: true, mode: 'date' })}
                    >
                    <Icon type='font-awesome' name='calendar' color='#512DA8' />
                    <Text >
                    {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                    </Text>
                    </TouchableOpacity>
      {/* Date Time Picker */}
                {this.state.show && (
                <DateTimePicker
                    value={this.state.date}
                    mode={this.state.mode}
                    minimumDate={new Date()}
                    minuteInterval={30}
                    onChange={(event, date) => {
                        if (date === undefined) {
                        this.setState({ show: false });
                     }
                    else {
                      this.setState({
                          show: this.state.mode === "time" ? false : true,
                          mode: "time",
                          date: new Date(date)
                      });
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

                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }


});

export default Reservation;