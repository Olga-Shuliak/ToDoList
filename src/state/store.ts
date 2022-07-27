import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../reducers/tasksReducer';
import {todoListsReducer} from '../reducers/todoListsReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer
})
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;



// store = {
//   state: {},
//   dispatch() {},
//   getState() {},
//   subscribe() {}
// }
