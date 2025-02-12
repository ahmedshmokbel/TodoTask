import { createAsyncThunk } from '@reduxjs/toolkit';
import { createTodoApi, deleteTodoApi, editTodoApi, fetchTodoByIdApi, fetchTodosApi } from '../../services/todosApis/todos.apis';

export const getTodosAction = createAsyncThunk(
  'todos',
  async () => {
    const response = await fetchTodosApi();
    console.log('re', JSON.stringify(response.data));

    const data = response?.data;
    return data;
  }
);

export const getTodoByIdAction = createAsyncThunk(
  'todos/details',
  async ({ toDoId }) => {
    // console.log('details', TodoId);

    const response = await fetchTodoByIdApi(toDoId);

    const data = response?.data;
    // console.log('fjfjfjf', data);

    return data;
  }
);


export const addTodoAction = createAsyncThunk(
  'todos/create',
  async ({ toDoData }) => {
    const response = await createTodoApi(toDoData);
    const data = response.status;
    console.log('create Todo', data);
    return data;
  }
);

export const editTodoAction = createAsyncThunk(
  'todos/edit',
  async ({ toDoData, toDoId }) => {
    try {
      const response = await editTodoApi(toDoData, toDoId);
      console.log('Edit Todo', response);

      const data = response.data;
      // console.log('Todos Edit', response.data);
      return data;
    } catch (error) {
      console.log('Error', error.data);
    }
  }
);


export const deleteTodoAction = createAsyncThunk(
  'todos/delete',
  async ({ todoId }) => {
    try {
      const response = await deleteTodoApi(todoId);
       const data = response.status;
      console.log('Todos Edit', response);
      return data;
    } catch (error) {
      console.log('Error', error.data);
    }
  }
);