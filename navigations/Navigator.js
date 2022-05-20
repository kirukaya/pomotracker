import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TimerScreen from '../screens/TimerScreen'
import ActivityScreen from '../screens/ActivityScreen'
import OptionsScreen from '../screens/OptionsScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const minToSec = mins => mins * 60

export default class Navigator extends React.Component {
  constructor(props) {
    super(props)
    
    const DEFAULT_WORK_MINS = 25
    const DEFAULT_BREAK_MINS = 5
  
    this.handler = this.handler.bind(this)
    this.handlerTm = this.handlerTm.bind(this)

    this.handlerRefresh = this.handlerRefresh.bind(this)

    this.state = {
      workTime: minToSec(DEFAULT_WORK_MINS),
      breakTime: minToSec(DEFAULT_BREAK_MINS), 
      timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000, // in ms
      isRunning: false,
      activeTimer: 'work',
      key: 0,
      all: [[],[]],
      value: ''
    }
    try {
      this.handlerRefresh()
    } catch (err) {console.log(err)}
  }

  handler = props =>{
    if (props > 10){
      this.setState({
        'workTime': minToSec(props),
      })
    } else {
      this.setState({
        'breakTime': minToSec(props),
      })
    }
  }

  handlerTm = props =>{
    this.setState({
      workTime: 3,
      breakTime: 3,
    })
  }

  handlerRefresh() { 
    AsyncStorage.getItem('savedTasksTestCODE1432').then(
      value =>
        this.loadActivities(JSON.parse(value))
    );
  }

  functionSave(){
    // только для того чтобы сразу сохранить данные и продемонстрировать функционал
    AsyncStorage.setItem('savedTasksTestCODE1432', JSON.stringify(this.state.all))  
  }

  loadActivities(value) {
    // значение чтобы продемонстрировать функционал
    // value = [['проанализировать полученную информацию','реализовать новый функционал', 'прочитать документацию', 'подготовить отчет'],['изучить материал на данную тему','написать основную часть 1','написать основную часть 2', 'убрать лишнее', 'подготовиться к контрольной', 'сделать курсовую работу', 'решить задачу по математике']]
    if (value != null){
      this.setState({all: value})
    }
    this.functionSave()
  }

  render() {
    return (
      <NavigationContainer>
      <Tab.Navigator
        initialRouteName="App"
        tabBarOptions={{
          activeTintColor: 'black',
          labelStyle: {
            fontSize: 11,
            fontWeight: 'bold'
          },
          inactiveTintColor: 'gray',
          activeBackgroundColor: 'white',
          inactiveBackgroundColor: '#white',
              style: {
                    backgroundColor: '#CE4418',
                    paddingBottom: 3
              }
          
        }}>       
        <Tab.Screen
          name="Pomodoro Timer"
          children={()=><TimerScreen main={this.state} h={this.handlerRefresh}/>}
          options={{
            tabBarLabel: 'TIMER',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="timer-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Activity List"
          children={()=><ActivityScreen main={this.state} h={this.handlerRefresh}/>}
          options={{
            tabBarLabel: 'LIST',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="checklist" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Options'
          children={()=><OptionsScreen h={this.handler} tm = {this.handlerTm}/>}
          options={{
            tabBarLabel: 'OPTIONS',
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    );
  }
}