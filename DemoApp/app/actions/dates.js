export const UPDATE_DAY = 'UPDATE_DAY';
export const UPDATE_RESULT = 'UPDATE_RESULT'

export const LOAD_TASKS = 'LOAD_TASKS';
export const FETCH_RESULT = 'FETCH_RESULT';
export const FETCH_ERROR = 'FETCH_ERROR';
export const LOAD_MONTH = 'LOAD_MONTH';
export const EDIT_MONTH_YEAR = 'EDIT_MONTH_YEAR';
export const EDIT_MONTH = 'EDIT_MONTH';

export const UPDATE_FIREBASE = 'UPDATE_FIREBASE';
export const LOAD_FIREBASE = 'LOAD_FIREBASE';
export const FETCH_RESULT_FIREBASE = 'FETCH_RESULT_FIREBASE';

export const loadMonth = (year, month) => ({
    type: LOAD_MONTH,
    year, month
})

export const editMonthAndYear = (year, month) => ({
    type: EDIT_MONTH_YEAR,
    year, month
})

export const editMonth = (month) => ({
    type: EDIT_MONTH,
    month
})

export const updateDay = (task) => ({
    type: UPDATE_DAY,
    task,
})

export const loadTasks = (day) => ({
    type: LOAD_TASKS,
    day,
})

export const updateFireBase = (task) => ({
    type: UPDATE_FIREBASE,
    task,
})

export const loadFirebase = (day) => ({
    type: LOAD_FIREBASE,
    day
})