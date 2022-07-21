type StateType = {
  age: number
  childrenCount: number
  name: string
}
type ActionType = {
  type: string
  [key: string]: any
}

export const userReducer = (state:StateType, action: ActionType)=> {
  switch (action.type) {
    case 'INCREMENT-AGE':

      // 1test
      // state.age = state.age +1;
      // return state;

      // __________делаем имутабельно____________________
      let newState = {...state};
      newState.age = state.age +1;
      return newState;

    case 'INCREMENT-CHILDREN-COUNT':
      // 1test
      //state.childrenCount = state.childrenCount+1;
      //return state;

      // __________делаем имутабельно____________________
        //короче, без промежуточной переменной
      return {
        ...state, childrenCount: state.childrenCount+1
      };

    case 'CHANGE-NAME':
      return {
        ...state, name: action.newName
      }
    default:
      throw new Error('I do not understand this type')
  }
}
