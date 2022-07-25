import {TaskObjectType, TodoListsType} from '../App';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './tasksReducer';
import {addTodoListAC, removeTodoListAC, todoListsReducer} from './todoListsReducer';


const startState: TaskObjectType = {
  '1': [
    {id: '1', title: 'HTML&CSS', isDone: true},
    {id: '2', title: 'JS', isDone: true},
    {id: '3', title: 'React', isDone: false},
    {id: '4', title: 'Redux', isDone: false},
    {id: '5', title: 'Angular', isDone: false}
  ],
  '2': [
    {id: '1', title: 'Book HTML&CSS', isDone: true},
    {id: '2', title: 'Book JS', isDone: true},
    {id: '3', title: 'Book React', isDone: false},
    {id: '4', title: 'Book Redux', isDone: false},
    {id: '5', title: 'Book Angular', isDone: false}
  ]
};

//________________________________________________________________________________

test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC('2', '2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    '1': [
      {id: '1', title: 'HTML&CSS', isDone: true},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
      {id: '4', title: 'Redux', isDone: false},
      {id: '5', title: 'Angular', isDone: false}
    ],
    '2': [
      {id: '1', title: 'Book HTML&CSS', isDone: true},

      {id: '3', title: 'Book React', isDone: false},
      {id: '4', title: 'Book Redux', isDone: false},
      {id: '5', title: 'Book Angular', isDone: false}
    ]
  });

});

test('correct task should be added to correct array',
    () => {

      const action = addTaskAC('2', 'Book Piton');

      const endState = tasksReducer(startState, action);

      expect(endState[1].length).toBe(5);
      expect(endState[2][0].id).toBeDefined();
      expect(endState[2].length).toBe(6);
      expect(endState[2][0].title).toBe('Book Piton');
      expect(endState[2][0].isDone).toBe(false);
    });
test('status of specified task should be changed', () => {

  const action = changeTaskStatusAC('2', '2', false);

  const endState = tasksReducer(startState, action);

  expect(endState[1][1].isDone).toBe(true);
  expect(endState[2][1].isDone).toBe(false);

});
test('new array should be added when new todolist is added', ()=> {

  const action = addTodoListAC('newTodoListTitle');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k=> k !== '1' && k!== '2');
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
})
test('property with todoListID should be deleted', ()=> {

  const action = removeTodoListAC('2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['2']).toBeUndefined();
})
