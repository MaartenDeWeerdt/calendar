import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Form } from '../components/Form';
import { updateDay, updateFireBase } from '../actions/dates';

class AddTask extends Component {
    state = {
        hour: '',
        task: '',
        chosenDate: null,
    }

    componentWillMount() {
        const selectedDate = this.props.month.find((day) => day.selected)
        const currentDate = new Date()

        const year = Number(selectedDate.year)
        const month = Number(selectedDate.month) - 1
        const day = Number(selectedDate.number)

        const hours = currentDate.getHours()

        const minutes = currentDate.getMinutes()
        const seconds = currentDate.getSeconds()
        const milliseconds = currentDate.getMilliseconds()

        const fullDate = new Date(year, month, day, hours, minutes, seconds, milliseconds)

        this.setState({
            chosenDate: fullDate
        })
    }

    handlePressBack = () => {
        this.props.navigation.goBack()
    }

    handleHour = (date) => {
        var fullDate = new Date(Number(date.getUTCFullYear()), Number(date.getMonth()), Number(date.getDate()), Number(date.getHours()), Number(date.getMinutes()), Number(date.getSeconds()))
        this.setState({
            chosenDate: fullDate
        })
    }

    handleTaskText = (text) => {
        this.setState({
            task: text
        })
    }

    handleSubmitTask = () => {
        const title = this.state.task;
        const day = this.state.chosenDate;

        const task = {
            dayOfMonth: day.getDate(),
            month: day.getMonth(),
            year: day.getUTCFullYear(),
            hours: day.getHours(),
            minutes: day.getMinutes(),
            text: title,
        }

        if (title != '') {

            //post task to graphql mongodb database
            //this.props.dispatch(updateDay(task))

            //post task to firebase database
            this.props.dispatch(updateFireBase(task))

            //go back to homescreen
            this.handlePressBack()
        }

    }

    render() {
        return (

            <Container>
                <StatusBar barStyle="default" translucent={false} />
                <Header onPressBack={(text) => this.handlePressBack(text)} />
                <Form date={this.state.chosenDate} chosenDate={this.state.chosenDate} onChangeHour={(date) => this.handleHour(date)} onChangeTask={(text) => this.handleTaskText(text)} submitTask={() => this.handleSubmitTask()} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        month: state.dates.month,
    }
}


export default connect(mapStateToProps)(AddTask)