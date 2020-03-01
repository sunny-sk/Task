const initialState = {
  tasks: [],
};

import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  COMPLETE_TASK,
} from '../action/TaskActions';

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      let newState = {...state};
      newState.tasks.push({
        id: state.length + 1,
        isCompleted: false,
        task: action.task.title,
        date: new Date(),
      });

      return {...newState};
    case DELETE_TASK:
      return {...state};
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
