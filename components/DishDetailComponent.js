import React, { Component } from 'react';
import { View, Text, ScrollView, PanResponder, Share, Alert, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
// import { Icon } from 'react-native-vector-icons/Icon';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite , postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes, 
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});



function RenderDish(props){
    const dish = props.dish;
    var viewRef;
    const handleViewRef = ref => viewRef = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy })=>{
        if(dx < -200)
        {
            return true;
        }
        else{
            return false;
        }

    };

    const recognizeComment=({moveX,moveY,dx,dy})=>{
        if(dx>200)
        {
            return true;
        }
        else{
            return false;
        }
    };

    const panResponder=PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState)=>{
            return true;
        },
        onPanResponderGrant:()=>{
            viewRef.rubberBand(1000)
            .then(endState=>console.log(endState.finished?'finished':'cancelled'));

        },
        onPanResponderEnd: (e, gestureState)=>{
            if(recognizeDrag(gestureState)){
            Alert.alert(
                'Add to Favorite',
                'Are you sure you wish to add '+ dish.name + ' to favorite?',
                [
                    {
                        text: 'Cancel',
                        onPress: ()=>console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text:'OK',
                        onPress:()=>{props.favorite ? console.log('Already favorite') : props.onPress()}
                    }

                ],
                {cancelable:false}
            )
            
            return true;
            }

            if(recognizeComment(gestureState))
            {
            props.toggleModal()
            return true;
            }
        }
    });


    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }


    if(dish != null){
        return(
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
        ref={handleViewRef}
        {...panResponder.panHandlers}
        
        >
            
            <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Icon raised reverse name={props.favorite?'heart':'heart-o'} type='font-awesome' color='#f50' onPress={()=>props.favorite?console.log('Already favorite'):props.onPress()}/>
            <Icon raised reverse name='pencil' type='font-awesome' color='#512DA9' onPress={()=>props.toggleModal()}/>
            <Icon
                    raised
                    reverse
                    name='share'
                    type='font-awesome'
                    color='#51D2A8'
                    style={styles.cardItem}
                    onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                    
            </View>
            </Card>
        </Animatable.View>
        );
    }
    else{
        return(<View></View>);
    }
}


function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem = ({item,index})=>{
        return(

            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                {/* <Text style={{fontSize:12}}>{item.rating} Stars</Text> */}
                <View
                    style={{ flex: 1, flexDirection: "row", alignContent: "flex-start" }}
                      >
                      <Rating ratingCount={5} imageSize={10} startingValue={item.rating} />
                </View>
                <Text style={{fontSize:12}}>{'--'+ item.author +','+ item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>

        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item=>item.id.toString()}/>
        </Card>
       
        </Animatable.View>
    );
}


class DishDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            rating:0,
            author:'',
            comment:'',
            
        };

        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.toggleModal = this.toggleModal.bind(this);


    }

    resetForm(){
        this.setState({
            rating:0,
            author:'',
            comment:''
        });
        
    }

    onSubmit(dishId){
        const rating = this.state.rating;
        const author = this.state.author;
        const comment = this.state.comment
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId,rating,author,comment)
        this.resetForm();
        
    }



    ratingCompleted(rating){
        this.setState({rating:rating})

    }
    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }


    // static navigationOptions = {
    //     title: 'Dish Details'
    // }
    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    

    render(){
        // cosnst dishId = this.props.navigation.getParam('dishId','')
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]} 
            favorite={this.props.favorites.some(el=>el===dishId)}
            onPress={()=>this.markFavorite(dishId)}
            toggleModal={()=>this.toggleModal()}
            />
            <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)} />
            <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={()=>this.toggleModal()}
            onRequestClose={()=>this.toggleModal()}
            >
                <View style={styles.modal}>
                    <Rating   onFinishRating={this.ratingCompleted} showRating fractions="{1}" startingValue={this.state.rating} />
                    
                    <Input
                    onChangeText={(author)=>this.setState({author:author})}
                    value={this.state.author}
                    placeholder='Author'
                    leftIcon={
                    <Icon
                    name='user-o'
                    type='font-awesome'
                    size={22}
                    color='black'
                    />
                    }
                    />

                    <Input
                    onChangeText={(comment)=>this.setState({comment:comment})}
                    value={this.state.comment}
                    placeholder='Comment'
                    leftIcon={
                    <Icon
                    name='comment-o'
                    type='font-awesome'
                    size={22}
                    color='black'
                    />
                    }
                    />
                    <View style={{marginTop:10,}}>
                    <Button title='Submit' color='#512DA8' style={{paddingVertical:25,}} onPress={()=>this.onSubmit(dishId)} />
                    </View>
                    <View style={{marginTop:10,  }}>
                    <Button title='Cancel' color='#DDDDDD' style={{paddingVertical:25,}} onPress={()=>this.toggleModal} />
                    </View>
                </View>

            </Modal>
            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);