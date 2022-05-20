import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DropdownComponent = props => {
  const [value, setValue] = useState(null);
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.test}
      data={props.data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select task"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        props.h(item.value)
      }}

    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 300,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  test:{
    width: '90%',
    alignSelf: 'center'
  },
  placeholderStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'center'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    width: '95%',
    fontSize: 16,
  },
});