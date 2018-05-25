import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, DatePickerIOS } from 'react-native';
import styles from './styles';

const Form = ({ date, onChangeHour, onChangeTask, submitTask }) => {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.smallText}>2018</Text>
                <Text style={styles.largeText}>{date.getDate()}/{date.getMonth() + 1}</Text>
            </View>
            <View style={styles.formContainer}>
                <DatePickerIOS
                    date={date}
                    onDateChange={onChangeHour}
                    mode="time"
                />
                <TextInput style={styles.textInput} placeholder="Task" multiline maxLength={75} onChangeText={(text) => onChangeTask(text)} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => submitTask()}>
                    <View style={styles.button}>
                        <Text style={styles.smallText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    )
};

Form.propTypes = {
    date: PropTypes.any,
    chosenDate: PropTypes.any,
    onChangeDate: PropTypes.func,
    onChangeTask: PropTypes.func,
    submitTask: PropTypes.func,
}

export default Form