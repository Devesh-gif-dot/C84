import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class ShowNotificationScreen extends React.Component(){
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.requestedRef= null
    }
    getUserNotification =()=>{
        this.requestedRef = db.collection('notifications').where("notification_Status","==","unread")
        .where("targetedUserId","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notifications=doc.data()
                allNotifications.push(notifications)
                allNotifications["documentId"]=doc.id
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    ComponentDidMount(){
        this.getUserNotification()
    }
    ComponentWillUnmount(){
        this.requestedRef()
    }
    renderItem=({item,index})=>{
        return(
            <View>
            <ListItem 
                key={index}
                leftElement={<Icon name="book"/>}
                title={item.bookName}
                subtitle={item.message}
                bottomDivider
            />
            </View>
        )
    }
    render(){
        return(
            <View>
                <MyHeader 
                title={"Notifications"}
                />
                <FlatList 
                keyExtractor={(index,item)=>index.toString()}
                data={this.state.allNotifications}
                renderItem={this.renderItem()}
               />
            </View>
        )
    }
}