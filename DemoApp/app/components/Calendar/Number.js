import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

const Number = ({ number, day, selected = false, grey = false, handleNumberPress }) => {
    const dayStyles = [styles.dayContainer];
    const textStyles = [styles.text];

    if (selected) {
        dayStyles.push({
            backgroundColor: '#52DF87',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        })
    }
    if (grey) {
        textStyles.push({
            color: 'grey',
        })
    }

    return (
        <TouchableWithoutFeedback onPress={handleNumberPress} disabled={grey}>
            <View style={dayStyles}>
                <Text style={textStyles}>{number}</Text>
                {selected && <Text style={textStyles}>{day}</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
};

Number.propTypes = {
    number: PropTypes.string,
    day: PropTypes.string,
    selected: PropTypes.bool,
    grey: PropTypes.bool,
    handleNumberPress: PropTypes.func,
}

export default Number