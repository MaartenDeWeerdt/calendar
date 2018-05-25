import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import Card from './Card';

class Agenda extends Component {
    render() {
        const fetching = this.props.isFetching
        const data = this.props.tasks
        var tasks = []

        if (data != null) {
            this.props.tasks.map((item, index) => {
                tasks.push(
                    <Card key={index} hour={`${item.hours}:${item.minutes}`} title={item.text} />
                )
            })
        }

        var selectedItem = this.props.currentMonthData.find(item => item.selected)

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false} pinchGestureEnabled={false} contentInset={{ bottom: 10 }}>
                    {selectedItem == undefined ? <View style={styles.textContainer}><Text style={styles.text}>Please select a day</Text></View> : (fetching ? <ActivityIndicator size="small" color="grey" /> : (tasks.length === 0 ? <View style={styles.textContainer}><Text style={styles.text}>There are no tasks for this day</Text></View> : tasks))}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.dates.tasks,
        isFetching: state.dates.isFetching,
        currentMonthData: state.dates.currentMonthData,
    }
}

export default connect(mapStateToProps)(Agenda)