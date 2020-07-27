import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { ScrollView } from 'react-native-gesture-handler';

function contact(){
    return(
        <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>

        <Card title="Contact Information" >
            <Text>
            121, Clear Water Bay Road{"\n\n"}
            Clear Water Bay, Kowloon{"\n\n"}
            HONG KONG{"\n\n"}
            Tel: +852 1234 5678{"\n\n"}
            Fax: +852 8765 4321{"\n\n"}
            Email:confusion@food.net{"\n\n"}
            </Text>
        </Card>
        </Animatable.View>
        </ScrollView>
    );


}
// function contact(props){

//     return(
//         <contactCard/>
//     );
// }



export default contact;