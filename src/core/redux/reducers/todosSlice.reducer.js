import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getTodoByIdAction, getTodosAction } from '../actions/todos.action';


const initialState = {
  loading: false,
  todosList: [],
  todoDetails: {},
};

export const TodosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  
  },
  extraReducers: builder => {
    builder.addCase(getTodosAction.pending, state => {
      state.loading = true;
    });

    builder.addCase(getTodosAction.fulfilled, (state, { payload }) => {
      //  console.log('fulfilled', payload);
      state.todosList = payload;
      state.loading = false;
   
    });
    builder.addCase(getTodosAction.rejected, (state, action) => {
      // console.log('user reject',action);
      state.loading = false;
   
    });
    ///////////////////////////////////////////////////////////////////////////////////
    
    
    builder.addCase(getTodoByIdAction.pending, state => {
      state.loadingDetails = true;
    });

    builder.addCase(
      getTodoByIdAction.fulfilled,
      (state, { payload }) => {
        state.loadingDetails = false;
        state.todoDetails = payload.todo?? state.todoDetails;
        
      }
    );
    builder.addCase(getTodoByIdAction.rejected, (state, action) => {
      // console.log('user reject',action);
      state.loading = false;
    });

    /////////////////////////////////////////////////////////////////////////////


    // builder.addCase(logout, (state, action) => {
    //     // console.log(state);
    //     return state
    // })

  },
});


export default TodosSlice.reducer;
