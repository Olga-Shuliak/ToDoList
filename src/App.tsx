import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import {ObjInArray, Todolist} from './components/Todolist';
import {EddItemForm} from './components/EddItemForm';
import Box from '@mui/material/Box';
import {Paper} from '@mui/material';


//types
export type TodoListsType = {
  id: number
  title: string
  nameButton: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type taskObjectType = {
  [key: number]: Array<ObjInArray>
}

//-----------------------------------------


function App() {

  let todoListID1 = 1;
  let todoListID2 = 2;
  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListID1, title: 'What to learn', nameButton: 'All'},
    {id: todoListID2, title: 'What to buy', nameButton: 'All'}
  ])
  let [tasks, setTasks] = useState<taskObjectType>(
      {
        [todoListID1]: [
          {id: 1, title: 'HTML&CSS', isDone: true},
          {id: 2, title: 'JS', isDone: true},
          {id: 3, title: 'React', isDone: false},
          {id: 4, title: 'Redux', isDone: false},
          {id: 5, title: 'Angular', isDone: false}
        ],
        [todoListID2]: [
          {id: 1, title: 'Book HTML&CSS', isDone: true},
          {id: 2, title: 'Book JS', isDone: true},
          {id: 3, title: 'Book React', isDone: false},
          {id: 4, title: 'Book Redux', isDone: false},
          {id: 5, title: 'Book Angular', isDone: false}
        ]
      })

  const removeTask = (todoListID: number, newId: number) => {
    // setTasks(tasks.filter(task => task.id !== newId))
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== newId)})
  }


  const tasksFilter = (todoListID: number, nameButton: FilterValueType) => {

    //будем менять в стейте todolist
    setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, nameButton: nameButton} : el))
    //берем функцию, которая записывает значение(теперь мапимся по элементам(если в элементе=>есть еl.id точно такой как у нас приходит todoListID ? {делай копию всего этого el, и у него в nameButton запиши приходящий в функцию nameButton} : оставь el как есть
  }


//добавляем таску

  const addTask = (todoListID: number, newTaskTitle: string) => {
    let newTask = {id: Math.random() * 100, title: newTaskTitle, isDone: false};
    // setTasks([newTask, ...tasks])
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }

  //изменяем таску (изменяемый спан)
  const updateTask = (todoListID: number, taskID: number, newTitle: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
  }

  //изменяем название листа
  const updateList = (todoListID: number, newTitle: string) => {
    setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
  }

  //меняем статус в чекбоксе
  const changeStatusCheckbox = (todoListID: number, currentID: number, eventStatus: boolean) => {
    // setTasks(tasks.map((el) => el.id === currentID ? {...el, isDone: eventStatus} : el))
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map(el => el.id === currentID ? {...el, isDone: eventStatus} : el)
    })
  }

  //удаляем весь лист
  const removeTodoList = (todoListID: number) => {
    setTodoLists(todoLists.filter(el => el.id !== todoListID));
    delete tasks[todoListID];
  }

  //добавляем целый лист
  const addTodoList = (title: string) => {
    let newID = Math.random() * 100;
    let newTodoList: TodoListsType = {id: newID, title: title, nameButton: 'All'};
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({...tasks, [newID]: []})
  }

  return (
      <div className="App">

        {/*<Header title={'TO DO LIST'}/>*/}
        {/*<Header title={'My To Do List'}/>*/}
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
  );
}

export default App;
