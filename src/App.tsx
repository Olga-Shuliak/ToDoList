import React, {useCallback} from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import {TaskType, Todolist} from './components/Todolist';
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
export type TodoListType = {
  todoListID: string
  title: string
  nameButton: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TaskObjectType = {
  [key: string]: Array<TaskType>
}

//-----------------------------------------


function App() {

//теперь забираем все из Redux_________________________________________________

let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

  let tasks = useSelector<AppRootStateType, TaskObjectType>(state => state.tasks)

  let dispatch = useDispatch()
//________________________________________________________________________________


//   //удаление таски
//   const removeTask = useCallback((todoListID: string, newId: string) => {
//     dispatch(removeTaskAC(todoListID, newId));
//   }, [dispatch])
//
// //фильтр кнопки
//   const tasksFilter = useCallback((todoListID: string, nameButton: FilterValueType) => {
//     dispatch(tasksFilterAC(todoListID, nameButton))
//   }, [dispatch])
//
// //добавляем таску
//   const addTask = useCallback((todoListID: string, newTaskTitle: string) => {
//     dispatch(addTaskAC(todoListID, newTaskTitle));
//   }, [dispatch])
//
//   //изменяем таску
//   const updateTask = useCallback((todoListID: string, taskID: string, newTitle: string) => {
//     dispatch(updateTaskAC(todoListID, taskID, newTitle))
//   }, [dispatch])
//
//   //изменяем название листа
//   const updateList = useCallback((todoListID: string, newTitle: string) => {
//     dispatch(updateListAC(todoListID, newTitle))
//   }, [dispatch])
//
//   //меняем статус
//   const changeStatusCheckbox = useCallback((todoListID: string, currentID: string, eventStatus: boolean) => {
//     dispatch(changeTaskStatusAC(todoListID, currentID, eventStatus))
//   }, [dispatch])
//
//
//   //удаляем весь лист
//   const removeTodoList = useCallback((todoListID: string) => {
//     let action = removeTodoListAC(todoListID);
//     dispatch(action);
//   }, [dispatch])

  //добавляем целый лист
  const addTodoList = useCallback((title: string) => {
    let action = addTodoListAC(title);
    dispatch(action);
  }, [dispatch])

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
          {todoLists.map((tl) => {

            return (
                <Todolist
                    key={tl.todoListID}
                    todoList={tl}/>

            )
          })
          }


        </Box>

      </div>
  )
}

export default App;
