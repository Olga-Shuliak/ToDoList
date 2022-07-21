import {FilterValueType, TodoListsType} from '../App';


//_______________________________________________________________________________________
//_________________________________types and AC__________________________________________

// общий тип; сколько экшенов, столько и типов
type TodoListsReducerType =
    tasksFilterACType
    | updateListACType
    | removeTodoListACType
    | addTodoListACType


type tasksFilterACType = ReturnType<typeof tasksFilterAC>
//тип не экшен криэйтера, а объекта, который он возвращает
export const tasksFilterAC = (todoListID: number, nameButton: FilterValueType) => {
  return {
    type: 'TASKS-FILTER',
    payload: {
      todoListID: todoListID,
      nameButton: nameButton
    }
  } as const
  // не забываем !!! as const !!!
}


type updateListACType = ReturnType<typeof updateListAC>
export const updateListAC = (todoListID: number, newTitle: string) => {
  return {
    type: 'UPDATE-LIST',
    payload: {
      todoListID,
      newTitle
    }
  } as const
}

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID: number) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todoListID
    }

  } as const
}

type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string)=> {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title
    }
  } as const
}



//________________________________________________________________________________________________

export const todoListsReducer = (state: Array<TodoListsType>, action: TodoListsReducerType): TodoListsType[] => {
  switch (action.type) {
    case 'TASKS-FILTER': {
      // !!! всегда вазвращаем стейт
      //return state

      // setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, nameButton: nameButton} : el))

      return state.map(el => el.id === action.payload.todoListID ? {...el, nameButton: action.payload.nameButton} : el)
    }

    case 'UPDATE-LIST': {
      return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.newTitle} : el)
    }

    case 'REMOVE-TODOLIST': {
      // setTodoLists(todoLists.filter(el => el.id !== todoListID));
      // delete tasks[todoListID];
      return state.filter(el => el.id !== action.payload.todoListID);
    }

    case 'ADD-TODOLIST': {
      let newID = Math.random() * 100;
      let newTodoList: TodoListsType = {id: newID, title: action.payload.title, nameButton: 'All'}
      return [...state, newTodoList]
    }

    default:
      return state
  }
}


