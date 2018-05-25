import { takeEvery, select, call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';

import { LOAD_TASKS, FETCH_RESULT, FETCH_ERROR, UPDATE_DAY, UPDATE_RESULT, UPDATE_FIREBASE, LOAD_FIREBASE, FETCH_RESULT_FIREBASE } from '../actions/dates';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLNIeFzENhkJFhJfuV40ULZA8fQZQjR7o",
    authDomain: "",
    databaseURL: "https://mycalendar-f02f6.firebaseio.com",
    storageBucket: "mycalendar-f02f6.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

this.itemsRef = firebaseApp.database().ref();

const uploadFirebase = function* (action) {
    const text = String(action.task.text)
    const dayOfMonth = String(action.task.dayOfMonth)
    const month = String(action.task.month + 1)
    const year = String(action.task.year)
    const hours = String(action.task.hours)
    const minutes = String(action.task.minutes)

    const jsonObject = {
        text: text,
        dayOfMonth: dayOfMonth,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes
    }
    this.itemsRef.push(jsonObject)
}

const fetchAllFirebase = function* (action) {
    var items = yield call(function () {
        return new Promise(function (resolve, reject) {
            this.itemsRef.once('value', function (snap) {
                var items = []
                snap.forEach((child) => {
                    if (child.val().dayOfMonth == action.day.number && child.val().month == action.day.month && child.val().year == action.day.year) {
                        items.push({
                            _key: child.key,
                            text: child.val().text,
                            dayOfMonth: child.val().dayOfMonth,
                            month: child.val().month,
                            year: child.val().year,
                            hours: child.val().hours,
                            minutes: child.val().minutes
                        });
                    }
                })
                resolve(items)
            })
        })
    })
    yield put({ type: 'FETCH_RESULT_FIREBASE', items })
}

const fetchAllTasks = function* (action) {
    if (action.day) {
        const dayOfMonth = action.day.number
        const month = String(action.day.month)
        const year = String(action.day.year)

        const query = `{
        tasksForDay(
            dayOfMonth: "${dayOfMonth}",
            month: "${month}",
            year: "${year}",
        ){_id, text, dayOfMonth, month, year, hours, minutes}
    }`

        const fetchData = () => fetch(`http://localhost:3000/graphql?query=${query}`)

        try {
            const response = yield call(fetchData);
            const result = yield response.json();
            if (result.errors) {
                yield put({ type: FETCH_ERROR, error: result.errors[0].message });
            } else {
                yield put({ type: FETCH_RESULT, result });
            }
        } catch (error) {
            yield put({ type: FETCH_ERROR, error: error.message });
        }
    } else {
        const result = null
        yield put({ type: FETCH_RESULT, result });
    }
};

const uploadDay = function* (action) {
    const text = String(action.task.text)
    const dayOfMonth = String(action.task.dayOfMonth)
    const month = String(action.task.month + 1)
    const year = String(action.task.year)
    const hours = String(action.task.hours)
    const minutes = String(action.task.minutes)

    const uploadData = () => fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `mutation{
            createTask(
                text: "${text}",
                dayOfMonth: "${dayOfMonth}",
                month: "${month}",
                year: "${year}",
                hours: "${hours}",
                minutes: "${minutes}"
            ){_id, text, dayOfMonth, month, year, hours, minutes}}`
        }),
    })

    try {
        const response = yield call(uploadData);
        const result = yield response.json();
        if (result.errors) {
            yield put({ type: FETCH_ERROR, error: result.errors[0].message });
        } else {
            yield put({ type: UPDATE_RESULT, result })
        }
    } catch (error) {
        yield put({ type: FETCH_ERROR, error: error.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(LOAD_TASKS, fetchAllTasks);
    yield takeEvery(UPDATE_DAY, uploadDay);
    yield takeEvery(UPDATE_FIREBASE, uploadFirebase);
    yield takeEvery(LOAD_FIREBASE, fetchAllFirebase)
};