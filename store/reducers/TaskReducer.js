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
      let newTaskState = {...state};
      newTaskState.tasks = [...action.tasks];
      return {...newTaskState};
    case ADD_TASK:
      newTaskState = {...state};
      newTaskState.tasks.push({...action.task});
      return {...newTaskState};
    case DELETE_TASK:
      newTaskState = {...state};
      let tasks = newTaskState.tasks.filter(task => task.id !== action.id);
      newTaskState.tasks = [...tasks];
      return {...newTaskState};
    case UPDATE_TASK:
      return {...state};
    case COMPLETE_TASK:
      newTaskState = {...state};
      newTaskState.tasks.forEach(task => {
        if (task.id === action.id) {
          task.isCompleted = true;
        }
      });
      return {...newTaskState};
    default:
      state;
  }
  return {...state};
};

export default taskReducer;
