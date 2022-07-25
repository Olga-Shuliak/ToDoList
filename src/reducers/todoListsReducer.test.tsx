import {TaskObjectType, TodoListsType} from '../App';
import {addTodoListAC, removeTodoListAC, tasksFilterAC, todoListsReducer, updateListAC} from './todoListsReducer';


test('correct todolist should be removed', ()=> {
  let todoListID1 = '1';
  let todoListID2 = '2';

  const startState: TodoListsType[]= [
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ];

  const endState = todoListsReducer(startState, removeTodoListAC(todoListID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListID2);
})
test('correct todoList should be added', ()=> {
  let todoListID1 = '1';
  let todoListID2 = '2';
  let newTodoListTitle = 'New Todolist';

  const startState: TodoListsType[]= [
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ];

  const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
})
test('correct todoList should change its name', ()=> {
  let todoListID1 = '1';
  let todoListID2 = '2';
  let newTodoListTitle = 'New Todolist';

  const startState: TodoListsType[]= [
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ];

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
  let todoListID1 = '1';
  let todoListID2 = '2';
  let newNameButton = 'Completed';

  const startState: TodoListsType[]= [
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ];


  const endState = todoListsReducer(startState, tasksFilterAC(todoListID2, 'Completed'));

  expect(endState[0].nameButton).toBe('All');
  expect(endState[1].nameButton).toBe('Completed');
})

