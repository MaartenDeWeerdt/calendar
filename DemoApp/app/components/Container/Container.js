import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import styles from './styles';

const Container = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
};

Container.propTypes = {
    children: PropTypes.any,
}

export default Container