import React, {useReducer} from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import {ObjInArray, Todolist} from './components/Todolist';
import {EddItemForm} from './components/EddItemForm';
import Box from '@mui/material/Box';
import {Paper} from '@mui/material';
import {
  addTodoListAC,
  removeTodoListAC,
  tasksFilterAC,
  todoListsReducer,
  updateListAC
} from './reducers/todoListsReducer';
import {v4} from 'uuid';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from './reducers/tasksReducer';

console.log(v4())
//types
export type TodoListsType = {
  id: string
  title: string
  nameButton: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TaskObjectType = {
  [key: string]: Array<ObjInArray>
}

//-----------------------------------------


function App() {

  let todoListID1 = '1';
  let todoListID2 = '2';

  //____________________________useState____________________________________
  // let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
  //   {id: todoListID1, title: 'What to learn', nameButton: 'All'},
  //   {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  // ])

  // let [tasks, setTasks] = useState<TaskObjectType>(
  //     {
  //       [todoListID1]: [
  //         {id: '1', title: 'HTML&CSS', isDone: true},
  //         {id: '2', title: 'JS', isDone: true},
  //         {id: '3', title: 'React', isDone: false},
  //         {id: '4', title: 'Redux', isDone: false},
  //         {id: '5', title: 'Angular', isDone: false}
  //       ],
  //       [todoListID2]: [
  //         {id: '1', title: 'Book HTML&CSS', isDone: true},
  //         {id: '2', title: 'Book JS', isDone: true},
  //         {id: '3', title: 'Book React', isDone: false},
  //         {id: '4', title: 'Book Redux', isDone: false},
  //         {id: '5', title: 'Book Angular', isDone: false}
  //       ]
  //     })

  //_____________________________useReducer____________________________________
  let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ])

  let [tasks, dispatchToTasks] = useReducer(tasksReducer,
      {
        [todoListID1]: [
          {id: '1', title: 'HTML&CSS', isDone: true},
          {id: '2', title: 'JS', isDone: true},
          {id: '3', title: 'React', isDone: false},
          {id: '4', title: 'Redux', isDone: false},
          {id: '5', title: 'Angular', isDone: false}
        ],
        [todoListID2]: [
          {id: '1', title: 'Book HTML&CSS', isDone: true},
          {id: '2', title: 'Book JS', isDone: true},
          {id: '3', title: 'Book React', isDone: false},
          {id: '4', title: 'Book Redux', isDone: false},
          {id: '5', title: 'Book Angular', isDone: false}
        ]
      })

  //удаление таски
  const removeTask = (todoListID: string, newId: string) => {
    // setTasks(tasks.filter(task => task.id !== newId))
    //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== newId)})
    dispatchToTasks(removeTaskAC(todoListID, newId));
  }

//фильтр кнопки
  const tasksFilter = (todoListID: string, nameButton: FilterValueType) => {
    dispatchToTodoLists(tasksFilterAC(todoListID, nameButton))
    // setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, nameButton: nameButton} : el))
    //берем функцию, которая записывает значение(теперь мапимся по элементам(если в элементе=>есть еl.id точно такой как у нас приходит todoListID ? {делай копию всего этого el, и у него в nameButton запиши приходящий в функцию nameButton} : оставь el как есть
  }

//добавляем таску
  const addTask = (todoListID: string, newTaskTitle: string) => {
    dispatchToTasks(addTaskAC(todoListID, newTaskTitle));
    // let newTask = {id: v4(), title: newTaskTitle, isDone: false};
    // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }

  //изменяем таску (изменяемый спан)
  const updateTask = (todoListID: string, taskID: string, newTitle: string) => {
    dispatchToTasks(updateTaskAC(todoListID, taskID, newTitle))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
  }

  //изменяем название листа
  const updateList = (todoListID: string, newTitle: string) => {
    // setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
    dispatchToTodoLists(updateListAC(todoListID, newTitle))
  }

  //меняем статус в чекбоксе
  const changeStatusCheckbox = (todoListID: string, currentID: string, eventStatus: boolean) => {
    // setTasks({
    //   ...tasks,
    //   [todoListID]: tasks[todoListID].map(el => el.id === currentID ? {...el, isDone: eventStatus} : el)
    dispatchToTasks(changeTaskStatusAC(todoListID, currentID, eventStatus))
  }


  //удаляем весь лист
  const removeTodoList = (todoListID: string) => {
    // setTodoLists(todoLists.filter(el => el.id !== todoListID));
    // delete tasks[todoListID];

    // чтобы не создавалось два раза ID нужно диспатчить ОДИН ЭКШН!!!
    let action = removeTodoListAC(todoListID);
    dispatchToTodoLists(action);
    dispatchToTasks(action);
  }

  //добавляем целый лист
  const addTodoList = (title: string) => {
    let action = addTodoListAC(title);
    dispatchToTodoLists(action);
    dispatchToTasks(action)
    // let newID = v4();
    // let newTodoList: TodoListsType = {id: newID, title: title, nameButton: 'All'};
    // setTodoLists([newTodoList, ...todoLists]);
    // setTasks({...tasks, [newID]: []})
  }

  return (
      <div className="App">

        <ButtonAppBar title={'TO DO LIST'}/>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 250,
            padding: 4,
            backgroundColor: 'aliceblue'
          },
        }}
            // className="listsBlock"
        >
          {/*добавить новый лист*/}
          <Paper
              // className="wrapperNewTodoList"
          >
            <h3>Create new list</h3>
            <EddItemForm callback={addTodoList}/>
          </Paper>

          {/*все todo листы*/}
          {todoLists.map((el) => {
            let filterTasks = tasks[el.id];
            if (el.nameButton === 'Active') {
              filterTasks = tasks[el.id].filter(task => !task.isDone)
            } else if (el.nameButton === 'Completed') {
              filterTasks = tasks[el.id].filter(task => task.isDone)
            }
            return (
                <Todolist key={el.id}
                          todoListID={el.id}
                          title={el.title}
                          tasks={filterTasks}
                          removeTask={removeTask}
                          tasksFilter={tasksFilter}
                          addTask={addTask}
                          changeStatusCheckbox={changeStatusCheckbox}
                          nameButton={el.nameButton}
                          removeTodoList={removeTodoList}
                          updateTask={updateTask}
                          updateList={updateList}
                />

            )
          })
          }


        </Box>

      </div>
  )
}

export default App;
