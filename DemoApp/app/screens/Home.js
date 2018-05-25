import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Calendar } from '../components/Calendar';
import { Agenda } from '../components/Agenda';
import { loadTasks, loadMonth, editMonthAndYear, editMonth, loadFirebase } from '../actions/dates';

const ANIMATION_DURATION = 500

class Home extends Component {

    state = {
        selectedDate: null,
    }

    componentWillMount() {
        const currentDate = new Date()

        const currentMontAndYear = {
            month: currentDate.getMonth() + 1,
            year: currentDate.getUTCFullYear()
        }

        const date = {
            number: String(currentDate.getDate()),
            day: String(currentDate.getDay()),
            month: String(currentDate.getMonth() + 1),
            year: String(currentDate.getUTCFullYear()),
            selected: false
        }

        this.props.dispatch(loadMonth(currentDate.getUTCFullYear(), currentDate.getMonth() + 1))
    }


    handleDispatch = (year, month, type) => {
        var passedMonth = month
        var passedYear = year
        var nextMonth, nextYear, prevMonth, prevYear

        if (passedMonth === 12) {
            nextMonth = 1
            nextYear = passedYear + 1
            prevYear = passedYear
            prevMonth = passedMonth - 1
        } else if (passedMonth === 1) {
            prevMonth = 12
            nextMonth = passedMonth + 1
            nextYear = passedYear
            prevYear = passedYear - 1
        } else {
            prevMonth = passedMonth - 1
            nextMonth = passedMonth + 1
            nextYear = passedYear
            prevYear = passedYear
        }

        if (type === 'forward') {
            this.props.dispatch(editMonthAndYear(nextYear, nextMonth))
            this.props.dispatch(loadMonth(nextYear, nextMonth))
        } else {
            this.props.dispatch(editMonthAndYear(prevYear, prevMonth))
            this.props.dispatch(loadMonth(prevYear, prevMonth))
        }
    }

    //update selected date
    handleSelectedDate = (date) => {
        var data = this.props.month

        console.log('data', data)
        console.log('date', date)
        console.log('month', this.props.month)

        this.setState({
            selectedDate: date,
        })

        //update data array in redux store
        for (var i = 0; i < data.length; i++) {
            if (data[i].number == date.number && data[i].month == this.props.currentMonthNumber && !data[i].grey) {
                data[i].selected = true
            } else {
                data[i].selected = false
            }
        }

        //load tasks from graphql mongodb database
        //this.props.dispatch(loadTasks(date))

        //load tasks from firebase database
        this.props.dispatch(loadFirebase(date))

        //update selected day in redux store
        this.props.dispatch(editMonth(data))
    }

    //go to add task screen
    handleAddTask = () => {
        this.props.navigation.navigate('AddTask', { selectedDate: this.state.selectedDate })
    }

    handleSwipeBack = () => {
        var month = this.props.currentMonthNumber
        var year = this.props.currentYearNumber

        this.handleDispatch(year, month, 'back')
    }

    handleSwipeForward = () => {
        var month = this.props.currentMonthNumber
        var year = this.props.currentYearNumber

        this.handleDispatch(year, month, 'forward')
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="default" translucent={false} />
                <Header add onPressAdd={() => this.handleAddTask()} />
                <Calendar onDatePress={(date) => this.handleSelectedDate(date)} handleSwipeBack={() => this.handleSwipeBack()} handleSwipeForward={() => this.handleSwipeForward()} />
                <Agenda selectedDate={this.state.selectedDate} />
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.dates.isFetching,
        currentMonthNumber: state.dates.currentMonthNumber,
        currentYearNumber: state.dates.currentYearNumber,
        month: state.dates.month,
    }
}

export default connect(mapStateToProps)(Home)