import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import DropDown from '../components/DropDown'
import Timer from '../components/Timer'
import Countdown from '../components/Countdown'
import TimerToggleButton from '../components/TimerToggleButton'

const nextTimer = {work: 'break', break: 'work'}


class TimerScreen extends React.Component {
  constructor(props){
    super(props)
    
    this.state = this.props.main
    this.dropDownData = []
    this.currentTaskValue = ''

    this.defineTimerVar()
  }
  
  defineTimerVar() {
    if (this.state.activeTimer == 'work'){
      this.timerVar = this.state.workTime
    } else {this.timerVar = this.state.breakTime}
  }

  componentDidMount() {
    this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
    this.setState({isRunning: this.timer.isRunning})
  }

  componentWillUnmount() {
    if (this.timer) this.timer.stop()
  }

  updateTime = target => (time, shouldStartTimer) => {
    if (this.state.activeTimer === target) {
      if (this.timer) this.timer.stop()
      const timeRemaining = +time * 1000
      this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
      if (!shouldStartTimer) this.timer.stop()
      this.setState({[`${target}Time`]: time, timeRemaining, isRunning: this.timer.isRunning})
    } else {
      this.setState({[`${target}Time`]: time, isRunning: this.timer.isRunning})
    }
  }

  resetTimer = shouldStopTimer => {
    const {activeTimer} = this.state
    this.updateTime(activeTimer)(this.state[`${activeTimer}Time`], !shouldStopTimer)
    this.state.key = this.state.key + 1

    this.defineTimerVar()
  }

  updateTimeRemaining = timeRemaining => {
    this.setState({timeRemaining})
  }

  toggleTimer = () => {
    if (!this.timer) return
    if (this.timer.isRunning) this.timer.stop()
    else this.timer.start()

    this.setState({isRunning: this.timer.isRunning})
  }

  functionSave(){
    AsyncStorage.setItem('savedTasksTestCODE1432', JSON.stringify(this.state.all))  
  }

  
  functionRefresh(){
    this.functionSave()
    this.props.h()
  }

  handleTimerEnd = () => {
    // перекидываем задание в раздел сделанных
    if (this.state.activeTimer == 'work'){
      for (var i in this.dropDownData){
        if (this.dropDownData[i].value == this.currentTaskValue){
          this.state.all[1].unshift(this.dropDownData[i].label)
          var ind = this.state.all[0].indexOf(this.dropDownData[i].label)
          this.state.all[0].splice(ind, 1)
          this.functionRefresh()
        }
      }
    }
    Vibration.vibrate([500, 500, 500])
    this.setState(prevState => ({activeTimer: nextTimer[prevState.activeTimer]}), this.resetTimer)
  }
  
  handleTest = props =>{
    this.currentTaskValue = props
  }

  render() {
    // change time
    if ((this.props.main.workTime != this.state.workTime) || (this.props.main.breakTime != this.state.breakTime)){
      this.state.workTime = this.props.main.workTime
      this.state.breakTime = this.props.main.breakTime
      // this.resetTimer()
      // this.toggleTimer()
    }


    // for work & break color change
    if (this.state.activeTimer == 'work'){
      this.state.colors = ['#c00']
    } else {this.state.colors = ['#0c0']}


    // for dropdown
    if (this.props.main.all != this.state.all){
      this.state.all = this.props.main.all
      this.dropDownData = []
      for (var i in this.state.all[0]){
        this.dropDownData.push({'label':this.state.all[0][i], 'value': i})
      }
    }

    return (
      <View style={styles.container}>
        
        
        <Countdown style={styles.center} timeRemaining={this.state.timeRemaining} onToggleTimer={this.toggleTimer} />
        
        <View style={{alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'black'}}>{this.state.activeTimer=='work' ? 'РАБОТА' : 'ОТДЫХ'}</Text>
        <CountdownCircleTimer
          key={this.state.key}
          isPlaying={this.state.isRunning}
          duration={this.timerVar}
          colors={this.state.colors}
        >
          {({ remainingTime }) => <Text style={{fontSize: 24, color: 'black'}}></Text>}
        </CountdownCircleTimer>
        
        </View>
        
        <DropDown data = {this.dropDownData} h = {this.handleTest}/>

        <View style={[styles.buttonGroup, styles.center]}>
          <TimerToggleButton 
            onToggle={this.toggleTimer} 
            isRunning={this.state.isRunning} 
            activeTimer={this.state.activeTimer}
          />
          <TouchableOpacity onPress={this.resetTimer}>
            <View style={this.state.activeTimer=='work' ? styles.button2 : styles.button2g}>
              <Text style={styles.buttonText}>
                Reset
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
} 

export default TimerScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'stretch',
    fontFamily: 'Roboto',
    backgroundColor: 'white'
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button2: {
    backgroundColor: '#c00',
    width: 100,
    textAlign: 'center',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    padding: 8,
    paddingRight: 35,
    boxShadow: '4px 4px 5px lightgray',
  },
  button2g: {
    backgroundColor: '#0c0',
    width: 100,
    textAlign: 'center',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    padding: 8,
    paddingRight: 35,
    boxShadow: '4px 4px 5px lightgray'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});