import React, {useCallback} from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import {TaskType, Todolist} from './components/Todolist';
import {EddItemForm} from './components/EddItemForm';
import Box from '@mui/material/Box';
import {Paper} from '@mui/material';
import {addTodoListAC} from './reducers/todoListsReducer';
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
