import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
// import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View , Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// const MenuNavigator = createStackNavigator({
//     Menu: { screen: Menu },
//     Dishdetail: { screen: DishDetail }
// }, {
//     initialRouteName: 'Menu',
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: '#512DA8'
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle:{
//             color: '#fff'
//         }
//     }

// });



// forum code


// const HomeNavigator = createStackNavigator({
//         Menu: { screen: Menu },
//         Dishdetail: { screen: DishDetail }
//     }, {
//         initialRouteName: 'Menu',
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#512DA8'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle:{
//                 color: '#fff'
//             }
//         }
    
//     });


const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen(){
    return(
        <HomeNavigator.Navigator  //initialRouteName='Home'
        screenOptions={{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }


        }}
        >

            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />


        </HomeNavigator.Navigator>

    );
}


// const MainNavigator = createDrawerNavigator({
//     Home: {
//         screen: HomeNavigator,
//         navigationOptions:{
//             title:'Home',
//             drawerLabel: 'Home'
//         }
//     },
//     Menu:{
//         screen: MenuNavigator,
//         navigationOptions:{
//             title: 'Menu',
//             drawerLabel: 'Menu'
//         }
//     }
    
// },{
//     drawerBackgroundColor: '#D1C4E9'
// });




const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen(){
    return(
        <MainNavigator.Navigator initialRouteName='Home' screenOptions={{
            
            drawerBackgroundColor: '#D1C4E9'
        }}>
            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen}/>
            <HomeNavigator.Screen name="Menu" component={MenuNavigatorScreen}/>

        </MainNavigator.Navigator>
    );
}


const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}



class Main extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         dishes: DISHES,
    //         selectedDish: null
    //     }
    // }

    // onDishSelect(dishId){
    //     this.setState({selectedDish: dishId});
    // }

    render(){
        return(
            // <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            // {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId) } /> */}
            // {/* <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} /> */}

            // <MainNavigator />
            // </View>


            <NavigationContainer>
            <MainNavigatorScreen/>           
            </NavigationContainer>


        );
    }
}

export default Main;