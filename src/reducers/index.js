import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';
import filterTable from './filterTable';
import sreach from './screach';
import sort from './sort';
const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    itemEditting,
    filterTable,
    sreach,
    sort
});

export default myReducer;

