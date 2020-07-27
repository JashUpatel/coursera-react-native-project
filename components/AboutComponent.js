import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
// import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders, 
    }
}


function History(){
    return(
        <Card title="Our History" >
            <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            {/* <br/><br/> */}
            {"\n\n"}
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.

            </Text>
        </Card>
    );
}

class Aboutus extends Component{
  

    render(){
        function renderLeaders({item,index}) {
            return(
                <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: { uri: baseUrl + item.image }}}

                />
            );
            
        }
        if(this.props.leaders.isLoading){
            return(
                <ScrollView>
                    <History/>
                    <Card title='Corporate Leadership'>
                        <Loading/>
                    </Card>
                    </ScrollView>

            );
        }
        else if(this.props.leaders.errMess){
            return(
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <History/>
                    <Card title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                    </ScrollView>

            );

        }
        else{

        return(
        <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>

        <History/>
        {/* <Corporate/> */}
        <Card title='Corporate Leadership'>
        <FlatList 
        data={this.props.leaders.leaders}
        renderItem={renderLeaders}
        keyExtractor={item=>item.id.toString()}
        />
        </Card>
        </Animatable.View>
        </ScrollView>
        );
        }
    }
}

// function Corporate(){
//     return(
        

//     );
// }


export default connect(mapStateToProps)(Aboutus);