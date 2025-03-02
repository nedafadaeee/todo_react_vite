import { TodoContext } from "./context/TodoContext";
import { UserContext } from "./context/UserContext";
import NewTodoInput from "./newTodoInput";
import todoReducer from "./reducers/todoReducer";
import TodoList from "./TodoList"
import {useEffect, useReducer, useState} from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import {addTodoRedux, setTodosRedux} from './../../store/slices/todosSlice'


export default function TodaMain(){

    const todos = useSelector(state => state.todoRedux.list);
    const dispatch = useDispatch();

    const handleKeyDown = async (todoTitle) =>  {
            //setTodos([...todos , {id:uuidv4() ,title:todoTitle , stats:false}])
            try {
                let res = await fetch("https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos" , {
                    method: 'post' ,
                    body : JSON.stringify({
                        title:todoTitle ,
                        stats:false
                    }),
                    headers : {'content-type':'application/json'}
                })
                let todoData = await res.json();


                dispatch(addTodoRedux(todoData))
                toast.success('totos created')
            } catch (error) {
                console.log(error)

            }
        }


    const getTodosFromApi = async () => {
        try {
            let res = await fetch("https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos")
                let todos = await res.json();
                if(res.ok){  dispatch(setTodosRedux(todos))  }
        } catch (error) {  }
    }

    useEffect( () =>{
        getTodosFromApi();
    } , [])



    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
            </div>
            <NewTodoInput addTodoTitle={handleKeyDown} />
            <TodoList todos={todos}  />
        </div>
    </div>

    )
}
