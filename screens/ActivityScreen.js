import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Feather, Ionicons, Octicons, AntDesign} from '@expo/vector-icons';

class ActivityScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.main 
  }

  functionSave(){
    AsyncStorage.setItem('savedTasksTestCODE1432', JSON.stringify(this.state.all))  
  }

  
  functionRefresh(){
    this.functionSave()
    this.props.h()
  }

  functionAdd(){
    if ((this.state.value != '')&&(this.state.value != null)){
      this.state.all[0].unshift(this.state.value)
      this.setState({'value': ''})
      this.functionRefresh()
    }
  }

  functionDelete(item){
    var index = this.state.all[0].indexOf(item);
    if (index > -1) {
      this.state.all[0].splice(index, 1); 
    }
    index = this.state.all[1].indexOf(item);
    if (index > -1) {
      this.state.all[1].splice(index, 1); 
    }
    this.functionRefresh()
  }

  render(){
    if (this.state.all != this.props.main.all){
      this.state.all = this.props.main.all
    }
    return (
      <ScrollView style={styles.container2}>
        <Text style={styles.activityText}>Add new task</Text>
        <View style={styles.viewRowContainer}>
          <TextInput id = 'new' style={styles.input} 
            onChangeText={(text) => this.setState({'value': (text)})} 
            value={this.state.value} 
            placeholder = 'new task'/>
          <TouchableOpacity onPress={() => this.functionAdd()}>
            <View style = {{marginLeft: 5}}>
              <Ionicons name="ios-add-circle-outline" size={30} color="#0b0" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.activityText}>Current tasks</Text>
          {this.state.all[0].map((item) => (
          <View style={styles.viewList}>
            <View style={styles.viewRowContainer}>
              <Text style={styles.viewListText}>{item}</Text>
              <TouchableOpacity onPress={() => this.functionDelete(item)}>
                <View style = {styles.viewListButton}>
                  <AntDesign name="closecircleo" size={24} color="#b00" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          ))}
          
        <Text style={styles.activityText}>Done tasks</Text>
        {this.state.all[1].map((item) => (
          <View style={styles.viewList}>
            <View style={styles.viewRowContainer}>
            <Text style={styles.viewListText}>{item}</Text>
            <TouchableOpacity onPress={() => this.functionDelete(item)}>
              <View style = {styles.viewListButton}>
                <AntDesign name="closecircleo" size={24} color="#b00" />
              </View>
            </TouchableOpacity>
            </View>
          </View>
          ))}
      </ScrollView>
    )
  }
}

export default ActivityScreen

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    paddingTop: 2,
    alignItems: 'stretch',
    fontFamily: 'Roboto',
    backgroundColor: 'white'
  },
  input: {
		justifyContent: 'center',
		backgroundColor: '#f9f9f9',
    width: '76%',
    marginLeft: '6%',
    textAlign: 'center',
    height: 40,
    boxShadow: '1px 1px 4px lightgray',
    fontSize: 18,
	},
  viewList:{
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    marginBottom: 8,
    marginLeft: '5%',
    marginRight: 15,
    textAlign: 'center',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    boxShadow: '1px 1px 4px lightgray',
    width: '90%'
  },
  viewListText:{
    fontSize: 20,
    marginRight: 20,
    marginTop: 0,
    padding: 5,
    paddingTop: 2,
    width: '85%',
    textAlign: 'center',
  },
  viewListButton:{
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 5,
  },
  viewRowContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  activityText:{
    fontSize: 20,
    padding: 10,
    color: '#343434',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '0px 1px 45px lightgray'
  }
})