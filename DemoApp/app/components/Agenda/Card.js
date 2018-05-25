import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 500;

class Card extends Component {
    constructor(props) {
        super(props);
        this.fadeAnimation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this.fadeAnimation, {
            toValue: 1,
            duration: ANIMATION_DURATION,
        }).start();
    }

    render() {

        const cardWrapperStyle = [
            styles.cardWrapper,
            { opacity: this.fadeAnimation },
        ];

        return (
            <TouchableWithoutFeedback>
                <Animated.View style={cardWrapperStyle}>
                    <View style={styles.cardContainer}>
                        <View style={styles.line} />
                        <View style={styles.content}>
                            <Text style={styles.text}>{this.props.hour}</Text>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

export default Card