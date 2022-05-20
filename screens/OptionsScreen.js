import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";

class OptionsScreen extends React.Component {
  render(){
    return (
      <View style={styles.container3}>
        <Text style={styles.optionsText}>Настройки pomodoro</Text>
        <View style={styles.controls}>
          <Text style={styles.buttonOptionsText2}>WorkTime:  </Text>
          <TouchableOpacity onPress={item => {this.props.h(15)}}>
            <View style={styles.buttonOptions}>
              <Text style={styles.buttonOptionsText}>
                15
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={item => {this.props.h(20)}}><View style={styles.buttonOptions}><Text style={styles.buttonOptionsText}>20</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={item => {this.props.h(25)}}><View style={styles.buttonOptions}><Text style={styles.buttonOptionsText}>25</Text></View></TouchableOpacity>
        </View>
        <View style={styles.controls}>
          <Text style={styles.buttonOptionsText2}>BreakTime: </Text>
          <TouchableOpacity onPress={item => {this.props.h(3)}}><View style={styles.buttonOptions}><Text style={styles.buttonOptionsText}>3</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={item => {this.props.h(5)}}><View style={styles.buttonOptions}><Text style={styles.buttonOptionsText}>5</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={item => {this.props.h(10)}}><View style={styles.buttonOptions}><Text style={styles.buttonOptionsText}>10</Text></View></TouchableOpacity>
        </View>

        <Text style={styles.version} onPress={item => {this.props.tm()}}>version 1.0.0</Text>
      </View>
    )
  }
}

export default OptionsScreen

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'stretch',
    fontFamily: 'Roboto',
    backgroundColor: 'white'
  },
  controls: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    margin: 6,
    width: '90%',
    borderRadius: 15,
    padding: 8,
    marginTop: 2,
    alignContent: 'center',
    alignItems:'center',
    textAlign:'center',
    alignSelf: 'center', 
    boxShadow: '1px 1px 4px lightgray'
  },
  buttonOptions: {
    backgroundColor: '#c22',
    color: '#343434',
    margin: 3,
    borderRadius: 15,
    width: 60,
    padding: 3
  },
  buttonOptionsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  buttonOptionsText2: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  optionsText: {
    fontSize: 20,
    padding: 10,
    color: '#343434',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '0px 1px 45px lightgray'
  },
  version:{
    position: 'absolute',
    bottom: 5,
    right: 10,
    color: 'gray'
  }
})