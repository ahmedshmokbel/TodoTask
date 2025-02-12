import callApi from '../callApi';

export const fetchTodosApi = () => {
  return callApi(
    `/todos`,
    'get',
    {},
    {
      parseResult: true,
      showError: false,
    }
  );
};
export const fetchTodoByIdApi = (toDoId) => {
  return callApi(
    `/todos/${toDoId}`,
    'get',
    {},
    {
      parseResult: true,
      showError: false,
    }
  );
};


export const createTodoApi = (toDoData) => {
  return callApi(
    `/todos`,
    'post',
    toDoData,
    {
      parseResult: true,
      showError: false,
    }
  );
};



export const editTodoApi = (toDoData,toDoId) => {
console.log(toDoData,toDoId);

  return callApi(
    `/todos/${toDoId}`,
    'put',
    toDoData,
    {
      parseResult: true,
      showError: false,
    }
  );
};

export const deleteTodoApi = (toDoId) => {

  return callApi(
    `/todos/${toDoId}`,
    'delete',
    {},
    {
      parseResult: true,
      showError: false,
    }
  );
};
