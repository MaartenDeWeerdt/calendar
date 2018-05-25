import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

class Header extends Component {
    render() {

        var dateSelected = false
        this.props.currentMonthData.map((item) => {
            if(item.selected) {
                dateSelected = true
            }
        })

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {this.props.add &&
                        <View style={styles.plusWrapper}>
                            <TouchableOpacity onPress={this.props.onPressAdd} disabled={dateSelected ? false : true} >
                                <View style={styles.plusButton}>
                                    <Text style={styles.text}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        ||
                        <View style={styles.backWrapper}>
                            <TouchableOpacity onPress={this.props.onPressBack}>
                                <View style={styles.backButton}>
                                    <Text style={styles.text}>{'<'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentMonthData: state.dates.currentMonthData,
    }
}

export default connect(mapStateToProps)(Header)