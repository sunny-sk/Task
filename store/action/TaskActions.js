export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const GET_TASKS = 'GET_TASKS';

import {URL} from 'react-native-dotenv';

import axios from 'axios';

export const addTask = task => {
  return async dispatch => {
    const payload = {
      title: task.title,
      isCompleted: false,
      date: new Date(),
    };
    const result = await axios.post(URL, payload, {
      headers: {
        'Content-type': 'application/json',
      },
    });

    payload.id = result.data.name;
    dispatch({type: ADD_TASK, task: payload});
  };
};
export const updateTask = task => {
  return {type: UPDATE_TASK, task: task};
};
export const completeTask = id => {
  return {type: COMPLETE_TASK, id: id};
};
export const deleteTask = id => {
  return {type: DELETE_TASK, id: id};
};
export const getTasks = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        'https://task-smart.firebaseio.com/task.json',
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      console.log(result.data);
      const loadedTask = [];
      for (const key in result.data) {
        loadedTask.push({
          id: key,
          title: result.data[key].title,
          date: result.data[key].date,
          isCompleted: result.data[key].isCompleted,
        });
      }
      dispatch({type: GET_TASKS, tasks: loadedTask});
    } catch (error) {
      throw new Error('server error');
    }
  };
};
