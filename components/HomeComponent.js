import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props){
    const item = props.item;

    if(item!=null){
        return(
            <Card featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}
            >
                <Text style={{margin:10}}>{item.description}</Text>
            

            </Card>
        )
    }
    else{
        return(<View></View>)
    }
}


class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            leaders:LEADERS,
            promotions:PROMOTIONS
        }
    }

    render(){
        return(
            // <View><Text>Home Component</Text>
            // <Button onPress={()=>this.props.navigation.navigate("Menu")} title="Go To Menu"/>
            // </View>

            <ScrollView>
                <RenderItem item={this.state.dishes.filter((dish)=> dish.featured)[0]}/>
                <RenderItem item={this.state.promotions.filter((promo)=> promo.featured)[0]}/>
                <RenderItem item={this.state.leaders.filter((leader)=> leader.featured)[0]}/>
             <Button onPress={()=>this.props.navigation.navigate("Menu")} title="Go To Menu"/>
            
            </ScrollView>
        );
    }


}

export default Home;