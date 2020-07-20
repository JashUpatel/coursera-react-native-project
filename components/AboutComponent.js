import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { LEADERS } from '../shared/leaders';



function History(){
    return(
        <Card title="Our History" >
            <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            <br/><br/>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.

            </Text>
        </Card>
    );
}

class Aboutus extends Component{
    constructor(props){
        super(props);
        this.state={
            leaders: LEADERS
        }
    }


    render(){
        function renderLeaders({item,index}) {
            return(
                <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: require('./images/alberto.png')}}

                />
            );
            
        }
        return(
        <View>
        <History/>
        {/* <Corporate/> */}
        <Card title='Corporate Leadership'>
        <FlatList 
        data={this.state.leaders}
        renderItem={renderLeaders}
        keyExtractor={item=>item.id.toString()}
        />
        </Card>
        </View>
        );
    }
}

// function Corporate(){
//     return(
        

//     );
// }


export default Aboutus;