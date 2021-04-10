import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

export default class MyHeader extends React.Component{
  constructor(props){
    super(props)
    this.state={
      value:""
    }
  }
  getUnreadNotifications=()=>{
    db.collection('notifications').where("notification_Status","==","unread")
    .where("targetedUserId","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allNotifications=[]
        snapshot.docs.map((doc)=>{
            var notifications=doc.data()
            allNotifications.push(notifications)
            allNotifications["documentId"]=doc.id
        })
        this.setState({
          value:allNotifications.length
        })
      })
  }
  componentDidMount(){
    this.getUnreadNotifications()
  }

  bellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' Size={25}
        onPress={this.props.navigation('Notification')}
        />
        <Badge value={this.state.value} containerStyle={{position:'absolute',top:-4,right:-4}}/>
      </View>
      )
  }
  render(){
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<this.bellIconWithBadge {...this.props} />}
      backgroundColor = "#eaf8fe"
    />
  );
  }
};


