import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, Text } from 'react-native';

function contact(){
    return(
        <Card title="Contact Information" >
            <Text>
            121, Clear Water Bay Road<br/><br/>
            Clear Water Bay, Kowloon<br/><br/>
            HONG KONG<br/><br/>
            Tel: +852 1234 5678<br/><br/>
            Fax: +852 8765 4321<br/><br/>
            Email:confusion@food.net<br/><br/>
            </Text>
        </Card>
    );


}
// function contact(props){

//     return(
//         <contactCard/>
//     );
// }



export default contact;