import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";
import PropTypes from 'prop-types'

const TimerToggleButton = props => {
  const title = props.isRunning ? 'Pause' : 'Start'
  return <TouchableOpacity onPress={props.onToggle}><View style={props.activeTimer=='work' ? styles.button : styles.buttong}><Text style={styles.buttonText}>{title}</Text></View></TouchableOpacity>
    }

TimerToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
}

export default TimerToggleButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c00',
    width: 120,
    textAlign: 'center',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    padding: 8,
    paddingLeft: 10,
    boxShadow: '3px 2px 3px lightgray',
    zIndex: 0
  },
  buttong: {
    backgroundColor: '#0c0',
    width: 120,
    textAlign: 'center',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    padding: 8,
    paddingLeft: 10,
    boxShadow: '3px 2px 3px lightgray'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})