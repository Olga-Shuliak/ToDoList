import {addTodoListAC, todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import {TaskObjectType, TodoListType} from '../App';

test('ids should be equals', ()=> {

  const startTasksState: TaskObjectType = {}
  const startTodolistsState: Array<TodoListType> = []

  const action = addTodoListAC('newTodoListTitle');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].todoListID


  expect(idFromTasks).toBe(action.payload.todoListID);
  expect(idFromTodolists).toBe(action.payload.todoListID);
})
