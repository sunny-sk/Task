export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = task => {
  return {type: ADD_TASK, task: task};
};
export const updateTask = task => {
  return {type: ADD_TASK, task: task};
};
export const deleteTask = id => {
  return {type: ADD_TASK, task: id};
};
