import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import styles from './styles';
import Number from './Number';

const ANIMATION_DURATION = 250

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.fadeAnimation = new Animated.Value(1);
    }

    onSwipe(gestureName, gestureState) {

        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_LEFT:
                this.handleTransition()
                setTimeout(() => {
                    this.props.handleSwipeForward()
                }, ANIMATION_DURATION)

                break;
            case SWIPE_RIGHT:
                this.handleTransition()
                setTimeout(() => {
                    this.props.handleSwipeBack()
                }, ANIMATION_DURATION)
                break;
        }
    }

    handleTransition = () => {
        Animated.sequence([
            Animated.timing(this.fadeAnimation, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.fadeAnimation, {
                toValue: 1,
                duration: ANIMATION_DURATION * 3,
            })
        ]).start();
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        const data = this.props.month

        var finalData = [];
        var tempArray = [];

        for (var i = 0; i < data.length; i++) {
            tempArray.push(data[i])
            if (i === 6 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41 || i === 48) {
                finalData.push(tempArray)
                tempArray = []
            }
        }

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = this.props.currentMonthData[1].month - 1

        const calendarContainerStyle = [styles.container, { opacity: this.fadeAnimation }]

        return (
            <Animated.View style={calendarContainerStyle}>
                <View style={styles.header}>
                    <Text style={styles.text}>{this.props.currentMonthData[1].year}</Text>
                    <Text style={styles.month}>{months[currentMonth]}</Text>
                </View>
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    config={config}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.dates}>
                            {
                                finalData.map((dateRow, i) => {
                                    return (
                                        <View key={i} style={styles.dateColumn}>
                                            {
                                                dateRow.map((date, y) => {
                                                    return (
                                                        <Number key={y} number={date.number} day={date.day} selected={date.selected} grey={date.grey} handleNumberPress={() => this.props.onDatePress(date)} />
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </GestureRecognizer>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        month: state.dates.month,
        currentMonthData: state.dates.currentMonthData
    }
}

export default connect(mapStateToProps)(Calendar)