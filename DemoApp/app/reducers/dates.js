import {
    LOAD_MONTH,
    UPDATE_DAY,
    UPDATE_RESULT,
    LOAD_TASKS,
    FETCH_RESULT,
    FETCH_ERROR,
    EDIT_MONTH_YEAR,
    EDIT_MONTH,
    LOAD_FIREBASE,
    FETCH_RESULT_FIREBASE
} from '../actions/dates';

const initialState = {
    tasks: [],
    isFetching: true,
    error: null,
    month: {},
    currentMonthData: {},
    currentMonthNumber: new Date().getMonth() + 1,
    currentYearNumber: new Date().getUTCFullYear()
}

const reducer = (state = initialState, action) => {
    var data = []
    switch (action.type) {
        case LOAD_MONTH:
            data = dateManager(action)
            return {
                ...state,
                month: data[0],
                currentMonthData: data[1]
            }
        case EDIT_MONTH:
            data = action
            return {
                ...state,
                month: data.month,
            }
        case UPDATE_DAY:
            data = state.tasks;
            data.push(action.task)
            return {
                ...state,
                tasks: data,
            }
        case UPDATE_RESULT:
            return {
                ...state,
                tasks: action.result.data.createTask
            }
        case LOAD_TASKS:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_RESULT:
            if (action.result === null) {
                data = []
            } else {
                data = action.result.data.tasksForDay
            }
            return {
                ...state,
                tasks: data,
                isFetching: false,
            }
        case LOAD_FIREBASE:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_RESULT_FIREBASE:
            return {
                ...state,
                tasks: action.items,
                isFetching: false,
            }
        case FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        case EDIT_MONTH_YEAR:
            return {
                ...state,
                currentMonthNumber: action.month,
                currentYearNumber: action.year
            }
        default: return state;
    }
};

const dateManager = (action) => {
    const currentYear = action.year
    const currentMonth = action.month
    var nextMonth, nextYear, prevMonth, prevYear

    if (currentMonth === 12) {
        nextMonth = 1
        nextYear = currentYear + 1
        prevYear = currentYear
        prevMonth = currentMonth - 1
    } else if (currentMonth === 1) {
        prevMonth = 12
        nextMonth = currentMonth + 1
        nextYear = currentYear
        prevYear = currentYear - 1
    } else {
        prevMonth = currentMonth - 1
        nextMonth = currentMonth + 1
        nextYear = currentYear
        prevYear = currentYear
    }

    const currentMonthData = getMonthData(currentMonth, currentYear, 'current')
    const prevMonthData = getMonthData(prevMonth, prevYear, 'prev')
    const nextMonthData = getMonthData(nextMonth, nextYear, 'next')
    const finalData = addDaysBefore(currentMonthData, prevMonthData, nextMonthData)

    const data = [finalData, currentMonthData]

    return (data)
}

const getMonthData = (passedMonth, passedYear, type) => {
    var year = passedYear;
    var month = passedMonth;

    var currentDay = new Date().getDate();
    var currentMonth = new Date().getMonth() + 1;
    var currentYear = new Date().getUTCFullYear();

    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
        if (type === 'prev' || type == 'next') {
            result.push({
                number: String(date.getDate()),
                day: days[date.getDay()],
                month: date.getMonth() + 1,
                year: date.getUTCFullYear(),
                selected: false,
                grey: true
            })
        } else {
            result.push({
                number: String(date.getDate()),
                day: days[date.getDay()],
                month: date.getMonth() + 1,
                year: date.getUTCFullYear(),
                selected: false,
                grey: false
            })
        }
        date.setDate(date.getDate() + 1);
    }
    return result;
}

const addDaysBefore = (currentMonthData, prevMonthData, nextMonthData) => {
    const currentMonthLength = currentMonthData.length - 1;
    const firstDayOfMonth = currentMonthData[0].day;
    const lastDayOfMonth = currentMonthData[currentMonthLength].day;

    var finalData = []
    var greyData = []
    var data = []
    var index = 0
    const prevMonthLength = prevMonthData.length - 1;

    switch (firstDayOfMonth) {
        case 'mon':
            return (addDaysAfter(lastDayOfMonth, currentMonthData, nextMonthData))
        case 'tue':
            data = prevMonthData
            index = prevMonthLength
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        case 'wed':
            data = prevMonthData
            index = prevMonthLength - 1
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        case 'thu':
            data = prevMonthData
            index = prevMonthLength - 2
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        case 'fri':
            data = prevMonthData
            index = prevMonthLength - 3
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        case 'sat':
            data = prevMonthData
            index = prevMonthLength - 4
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        case 'sun':
            data = prevMonthData
            index = prevMonthLength - 5
            greyData = data.slice(index)
            finalData.push(...greyData, ...currentMonthData)
            return (addDaysAfter(lastDayOfMonth, finalData, nextMonthData))
        default: finalData.push(currentMonth)
    }
}

const addDaysAfter = (lastDayOfMonth, currentMonth, nextMonthData) => {
    var finalData = []
    var greyData = []
    var data = []

    switch (lastDayOfMonth) {
        case 'mon':
            data = nextMonthData
            greyData = data.slice(0, 6)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'tue':
            data = nextMonthData
            greyData = data.slice(0, 5)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'wed':
            data = nextMonthData
            greyData = data.slice(0, 4)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'thu':
            data = nextMonthData
            greyData = data.slice(0, 3)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'fri':
            data = nextMonthData
            greyData = data.slice(0, 2)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'sat':
            data = nextMonthData
            greyData = data.slice(0, 1)
            finalData.push(...currentMonth, ...greyData)
            return (
                finalData
            )
        case 'sun':
            finalData.push(...currentMonth)
            return (
                finalData
            )
        default: finalData.push(...currentMonth)
    }
}

export default reducer;