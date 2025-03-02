import {createSlice} from '@reduxjs/toolkit'

const todosSlice = createSlice({

    name : 'todos',
    initialState : {
        list : []
    },
    reducers : {
        setTodosRedux : (state , { payload }) => {

            state.list = payload;

        },
        addTodoRedux : ( state , action) => {

            state.list.push(action.payload)
        },

        editTodoRedux : (state , { payload }) => {
            state.list = state.list.map((todo) => {
                return todo.id === payload.id
                        ? {
                            ...todo,
                            title : payload.title
                        }
                        : todo
            })
        },
        deleteTodoRedux : (state , action) => {
            state.list = state.list.filter((todo) => {
                return  todo.id !== action.payload


            })
        },
        //toggleTodoRedux :
        toggleTodoRedux : (state , { payload }) => {
            state.list = state.list.map((todo) => {
                return todo.id === payload.id
                        ? {
                            ...todo,
                            status : ! payload.status
                        }
                        : todo
            })
        }

    }
})

export const{ addTodoRedux , setTodosRedux , editTodoRedux , deleteTodoRedux , toggleTodoRedux} = todosSlice.actions;
export default todosSlice.reducer;
