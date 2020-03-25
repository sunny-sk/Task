export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const GET_TASKS = 'GET_TASKS';
import {URL} from 'react-native-dotenv';

import axios from 'axios';

export const addTask = task => {
  return async dispatch => {
    try {
      const payload = {
        title: task.title,
        isCompleted: false,
        date: task.date ? task.date : new Date(),
      };
      const result = await axios.post(
        'https://task-smart.firebaseio.com/task.json',
        payload,
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      payload.id = result.data.name;
      dispatch({type: ADD_TASK, task: payload});
    } catch (error) {
      if (error.message === 'Network Error') {
        throw new Error(error.message);
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
};

export const updateTask = task => {
  return {type: UPDATE_TASK, task: task};
};
export const completeTask = task => {
  return async dispatch => {
    try {
      const result = await axios.put(
        `https://task-smart.firebaseio.com/task/${task.id}.json`,
        {
          isCompleted: true,
          date: task.date,
          title: task.title,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      console.log(result.data);
      dispatch({type: COMPLETE_TASK, id: task.id, updatedTask: result.data});
    } catch (error) {
      throw new Error('server error');
    }
  };
};
export const deleteTask = task => {
  return async dispatch => {
    try {
      const result = await axios.delete(
        `https://task-smart.firebaseio.com/task/${task.id}.json`,
      );
      dispatch({type: DELETE_TASK, id: task.id});
    } catch (error) {
      console.log(error);
      throw new Error('server error');
    }
  };
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
      // console.log(result.data);
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
