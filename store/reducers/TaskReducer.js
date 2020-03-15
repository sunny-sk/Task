const initialState = {
  tasks: [],
};

import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  COMPLETE_TASK,
  GET_TASKS,
} from '../action/TaskActions';

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      let newState = {...state};
      newState.tasks = [...action.tasks];
      return {...newState};
    case ADD_TASK:
      newState = {...state};
      console.log(action.task);
      newState.tasks.push({...action.task});
      return {...newState};
    case DELETE_TASK:
      newState = {...state};
      let foundIndex;
      newState.tasks.forEach((task, index) => {
        if (task.id === action.id) {
          foundIndex = index;
          return;
        }
      });
      newState.tasks.splice(foundIndex, 1);
      return {...newState};
    case UPDATE_TASK:
      return {...state};
    case COMPLETE_TASK:
      newState = {...state};
      newState.tasks[action.id].isCompleted = !newState.tasks[action.id]
        .isCompleted;

      return {...newState};
    default:
      state;
  }
  return {...state};
};

export default taskReducer;
