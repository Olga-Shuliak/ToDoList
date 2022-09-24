import {FilterValueType, TaskObjectType, TodoListType} from '../App';
import {addTodoListAC, removeTodoListAC, tasksFilterAC, todoListsReducer, updateListAC} from './todoListsReducer';

let todoListID1: string;
let todoListID2: string;

let startState: TodoListType[];

beforeEach(()=> {
  todoListID1 = '1';
  todoListID2 = '2';

  startState = [
    {todoListID: todoListID1, title: 'What to learn', nameButton: 'All'},
    {todoListID: todoListID2, title: 'What to buy', nameButton: 'All'}
  ];
})

test('correct todolist should be removed', ()=> {

  const endState = todoListsReducer(startState, removeTodoListAC(todoListID1));

  expect(endState.length).toBe(1);
  expect(endState[0].todoListID).toBe(todoListID2);
})
test('correct todoList should be added', ()=> {

  let newTodoListTitle = 'New Todolist';

  const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
})
test('correct todoList should change its name', ()=> {

  let newTodoListTitle = 'New Todolist';

  const action = {
    type:'UPDATE-LIST',
    id: todoListID2,
    title: newTodoListTitle
  }

  const endState = todoListsReducer(startState, updateListAC(todoListID2, newTodoListTitle));

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todoList should changed', ()=> {

  let newNameButton:FilterValueType;
  newNameButton = 'Completed';

  const endState = todoListsReducer(startState, tasksFilterAC(todoListID2, newNameButton));

  expect(endState[0].nameButton).toBe('All');
  expect(endState[1].nameButton).toBe('Completed');
})

