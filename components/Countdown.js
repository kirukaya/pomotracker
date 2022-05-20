import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Vibration, TextInput} from "react-native";
import PropTypes from 'prop-types'

const Countdown = props => {
  const totalSecs = Math.round(props.timeRemaining / 1000)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  const paddedZero = secs < 10 ? '0' : ''
  return <Text style={[styles.countdownText, props.style]}>{mins}:{paddedZero}{secs}</Text>
}

Countdown.propTypes = {
  onToggleTimer: PropTypes.func.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  style: PropTypes.number,
}

export default Countdown

const styles = StyleSheet.create({
countdownText: {
    fontSize: 72
  },
})