import {FilterValueType, TodoListsType} from '../App';

export const TodoListsReducer = (state: Array<TodoListsType>, action: TodoListsReducerType) => {
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
      return state.filter(el=>el.id !== action.payload.todoListID);
    }

    default:
      return state
  }
}

// общий тип; сколько экшенов, столько и типов
type TodoListsReducerType = tasksFilterACType | updateListACType | removeTodoListACType

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
  return{
    type: 'REMOVE-TODOLIST',
    payload: {
      todoListID
    }

  } as const
}
