const initialState = {
  tasks: [
    {id: 1, isCompleted: false, task: 'no park', date: new Date()},
    {id: 2, isCompleted: false, task: 'Development', date: new Date()},
    {id: 3, isCompleted: false, task: 'Exercise', date: new Date()},
  ],
  dailyTask: [],
};

import {ADD_TASK, DELETE_TASK, UPDATE_TASK} from '../action/TaskActions';

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return state;
    case DELETE_TASK:
      return state;
    case UPDATE_TASK:
      return state;
    default:
      state;
  }
  return state;
};

export default taskReducer;
