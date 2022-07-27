import {TaskObjectType} from '../App';
import {addTodoListACType, removeTodoListACType} from './todoListsReducer';
import {v4} from 'uuid';


let initialState: TaskObjectType = {}


//____________________________________________Types_______________________________________________
type TasksReducerType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | updateTaskACType

    | addTodoListACType
    | removeTodoListACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>

//___________________________________________Tasks Reducer_____________________________________________

export const tasksReducer = (state = initialState, action: TasksReducerType): TaskObjectType => {
  switch (action.type) {

    case 'REMOVE-TASK': {
      //{...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== newId)}
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(idTask => idTask.id !== action.payload.newId)
      }

    }
    case 'ADD-TASK': {
      let newTask = {id: v4(), title: action.payload.newTaskTitle, isDone: false};
      return {
        ...state,
        [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID]
            .map(task => task.id === action.payload.currentID ? {
              ...task,
              isDone: action.payload.eventStatus
            } : task)
      }
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID]
            .map(task => task.id === action.payload.taskID
                ? {...task, title: action.payload.newTitle}
                : task)
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state, [action.payload.todoListID]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      let copyState = {...state};
      delete copyState[action.payload.todoListID];
      return copyState
    }
    //то же самое через деструктуризацию
    // case 'REMOVE-TODOLIST': {
    //   let {[action.payload.todoListID]: [],...rest} = {...state};
    //   return rest
    // }

    default:
      return state
  }
}

//_____________________________________Action Creators______________________________________________

export const removeTaskAC = (todoListID: string, newId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todoListID,
      newId
    }
  } as const
}
export const addTaskAC = (todoListID: string, newTaskTitle: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todoListID,
      newTaskTitle
    }
  } as const
}
export const changeTaskStatusAC = (todoListID: string, currentID: string, eventStatus: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todoListID,
      currentID,
      eventStatus
    }
  } as const
}
export const updateTaskAC = (todoListID: string,  taskID: string, newTitle: string) => {
  return {
    type: 'UPDATE-TASK',
    payload: {
      todoListID,
      taskID,
      newTitle
    }
  }as const
}
