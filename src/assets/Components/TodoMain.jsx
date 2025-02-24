import { TodoContext } from "./context/TodoContext";
import { UserContext } from "./context/UserContext";
import NewTodoInput from "./newTodoInput";
import todoReducer from "./reducers/todoReducer";
import TodoList from "./TodoList"
import {useEffect, useReducer, useState} from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function TodaMain(){

    //const [ todos , setTodos] = useState([])
    const [ todos , todoDispatcher ] = useReducer( todoReducer , [])

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
                //setTodos([...todos , todoData])

                todoDispatcher({
                    type : 'add' ,
                    id : todoData?.id,
                    title: todoData?.title,
                    status: todoData?.status
                })
                toast.success('totos created')
            } catch (error) {
                console.log(error)

            }
        }



    const getTodosFromApi = async () => {
        try {
            let res = await fetch("https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos")
                let todos = await res.json();
                if(res.ok){
                    todoDispatcher({
                        type: 'initial-todos',
                        todos
                    })
                }
                setTodos(todos)

        } catch (error) {
             // ahow errors
        }
    }

    useEffect( () =>{

        getTodosFromApi();

    } , [])



    //  if (localStorage.getItem("TodosList") != null) {
    //     useEffect( () =>{
    //         setTodos(JSON.parse(localStorage.getItem('TodosList') ?? []))
    //     } , []) /// [] => یعنی فقط طمانی که کامپوننت اجرا شد تو اجرا شو هر بار که استیت تغییر میکنه دیگه هیچ تغییری نکن
    // }

    //  useEffect( () =>{
    //     localStorage.setItem('TodosList' , JSON.stringify(todos) )
    //  } , [todos])


    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
            </div>
            <NewTodoInput addTodoTitle={handleKeyDown} />
            <TodoContext.Provider value={{
                todos ,
                todoDispatcher
            }}>
            <TodoList  />
            </TodoContext.Provider>
        </div>
    </div>

    )
}
