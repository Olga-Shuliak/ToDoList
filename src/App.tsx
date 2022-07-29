import React, {useCallback} from 'react';
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
  updateListAC
} from './reducers/todoListsReducer';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from './reducers/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


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

  // let todoListID1 = '1';
  // let todoListID2 = '2';

let todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todoLists)

  let tasks = useSelector<AppRootStateType, TaskObjectType>(state => state.tasks)

  let dispatch = useDispatch()
  //_____________________________useReducer____________________________________
  // let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
  //   {id: todoListID1, title: 'What to learn', nameButton: 'All'},
  //   {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  // ])
  //
  // let [tasks, dispatchToTasks] = useReducer(tasksReducer,
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

  //удаление таски
  const removeTask = useCallback((todoListID: string, newId: string) => {
    dispatch(removeTaskAC(todoListID, newId));
  }, [dispatch])

//фильтр кнопки
  const tasksFilter = useCallback((todoListID: string, nameButton: FilterValueType) => {
    dispatch(tasksFilterAC(todoListID, nameButton))
  }, [dispatch])

//добавляем таску
  const addTask = useCallback((todoListID: string, newTaskTitle: string) => {
    dispatch(addTaskAC(todoListID, newTaskTitle));
  }, [dispatch])

  //изменяем таску
  const updateTask = useCallback((todoListID: string, taskID: string, newTitle: string) => {
    dispatch(updateTaskAC(todoListID, taskID, newTitle))
  }, [dispatch])

  //изменяем название листа
  const updateList = useCallback((todoListID: string, newTitle: string) => {
    dispatch(updateListAC(todoListID, newTitle))
  }, [dispatch])

  //меняем статус
  const changeStatusCheckbox = useCallback((todoListID: string, currentID: string, eventStatus: boolean) => {
    dispatch(changeTaskStatusAC(todoListID, currentID, eventStatus))
  }, [dispatch])


  //удаляем весь лист
  const removeTodoList = useCallback((todoListID: string) => {
    let action = removeTodoListAC(todoListID);
    dispatch(action);
  }, [dispatch])

  //добавляем целый лист
  const addTodoList = useCallback((title: string) => {
    let action = addTodoListAC(title);
    dispatch(action);
  }, [
    dispatch
  ])

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
