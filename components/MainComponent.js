import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
// import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import { ScrollView, Text, View, Image, StyleSheet, ToastAndroid, Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createNativeWrapper } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { fetchDishes, fetchPromos, fetchComments, fetchLeaders } from '../redux/ActionCreators';
//import { ReservationComponent } from './ReservationComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent'; 
import Login from './LoginComponent';

import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: ()=> dispatch(fetchDishes()),
    fetchComments: ()=> dispatch(fetchComments()),
    fetchPromos: ()=> dispatch(fetchPromos()),
    fetchLeaders: ()=> dispatch(fetchLeaders()),
});




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


const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={{uri: baseUrl + 'images/logo.png'}}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);



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
                options={
                    ({ navigation })=>({
                        headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                            onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                    })
                }
            />


        </HomeNavigator.Navigator>

    );
}

const favoriteNavigator = createStackNavigator();

function favoriteNavigatorScreen() {
    return(
        <favoriteNavigator.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }} >
            <favoriteNavigator.Screen name='Favorites' component={Favorites}
            options={
                ({ navigation })=>({
                    headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                             onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                })
            }
            />
        </favoriteNavigator.Navigator>
    );
    
}



const reservationNavigator = createStackNavigator();

function reservationNavigatorScreen() {
    return(
        <reservationNavigator.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }} >
            <reservationNavigator.Screen name='Reservation' component={Reservation}
            options={
                ({ navigation })=>({
                    headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                             onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                })
            }
            />
        </reservationNavigator.Navigator>
    );
    
}


const loginNavigator = createStackNavigator();

function loginNavigatorScreen() {
    return(
        <loginNavigator.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }} >
            <loginNavigator.Screen name='Login' component={Login}
            options={
                ({ navigation })=>({
                    headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                             onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                })
            }
            />
        </loginNavigator.Navigator>
    );
    
}



const aboutNavigator = createStackNavigator();

function aboutNavigatorScreen() {
    return(
        <aboutNavigator.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }} >
            <aboutNavigator.Screen name='About Us' component={Aboutus}
            options={
                ({ navigation })=>({
                    headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                             onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                })
            }
            />
        </aboutNavigator.Navigator>
    );
    
}


const contactNavigator = createStackNavigator();

function contactNavigatorScreen() {
    return(
        <contactNavigator.Navigator screenOptions={{
            headerStyle:{
                backgroundColor:'#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }}>
            <contactNavigator.Screen  name='Contact Us' component={Contact}
            options={
                ({ navigation })=>({
                    headerLeft: ()=>(
                        <Icon name='menu' size={24} color='white'
                          onPress={()=>navigation.toggleDrawer()}
                        />
                    )
                })
            }
              />
        </contactNavigator.Navigator>
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
        <MainNavigator.Navigator initialRouteName='Home'
        drawerStyle={{backgroundColor:'#D1C4E9'}}
        drawerContent={props=><CustomDrawerContentComponent {...props}/>}
        >

        <MainNavigator.Screen name="Login" component={loginNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='sign-in' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />

            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} 
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='home' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />
            <MainNavigator.Screen name="About Us" component={aboutNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='info-circle' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />
            
            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='list' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />

            <MainNavigator.Screen name="Reserve Table" component={reservationNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='cutlery' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />

              
            
            <MainNavigator.Screen name="My Favorites" component={favoriteNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='heart-o' type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }}
            />

            <MainNavigator.Screen name="Contact Us" component={contactNavigatorScreen}
            options={{
                drawerIcon: ({tintColor})=>(
                    <Icon name='address-card' type='font-awesome'
                    size={22}
                    color={tintColor}
                    />
                )
            }}
            />

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
                options={
                    ({ navigation })=>({
                        headerLeft: ()=>(
                            <Icon name='menu' size={24} color='white'
                             onPress={()=>navigation.toggleDrawer()}
                            />
                        )
                    })
                }
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


    componentDidMount(){
        this.props.fetchComments();
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchLeaders();

         const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
          });

          unsubscribe();
          

        // NetInfo.fetch().then((connectionInfo) => {
        //     ToastAndroid.show('Initial Network Connectivity Type: '
        //         + connectionInfo.type, ToastAndroid.LONG)
        // });
        
         NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))

      
}


    componentWillUnmount() {
        NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
         }


         handleConnectivityChange = (connectionInfo) => {
            switch (connectionInfo.type) {
                case 'none': 
                    ToastAndroid.show ('You are now offline', ToastAndroid.LONG);
                    break;
                case 'wifi':
                    ToastAndroid.show ('You are now on WiFi', ToastAndroid.LONG);
                    break;
                case 'cellular':
                    ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
                    break;
                case 'unknown' :
                    ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
                    break;
                default: 
            }
        }
      

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


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  


export default connect(mapStateToProps,mapDispatchToProps)(Main);