import { TodoContext } from "./context/TodoContext";
import DeleteIcon from "./Icons/DeleteIcon";
import EditIcon from "./Icons/EditIcon";
import React, {useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';


export default function TodoListItems({todo}) {

   const [ editMode , setEditMode] = useState(false);
   const  [inputValue , setInputValue] = useState(todo?.title);

   const {todoDispatcher} = useContext(TodoContext);

   const deleteTodoHandler = async (deleteTodos ) => { // فیلتر برای این هست که بر اساس شرطی که چک می کنیم یک یا چند تا از آیتم ها رو حذف کنه
    let res = await fetch(`https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos/${deleteTodos.id}`, {
        method: 'DELETE',
    })
    if(res.ok){

        todoDispatcher({
            type: 'delete' ,
            id : deleteTodos.id
        })
        toast.error('the todo deleted')
    }
    let msg = await res.json();
    toast.error(msg)
}


const toggleTodoStatsHandler = async (changeStatus) =>{ // مپ برای این هست که بر اساس شرطی که داریم یک یا چند تا از آیتم ها رو تغییر بده

let res = await fetch(`https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos/${changeStatus.id}` , {
    method: 'put' ,
    headers : {'content-type':'application/json'},
    body : JSON.stringify(
          {
            status : ! changeStatus.status
        }
    ),
})
if(res.ok){
    todoDispatcher({
        type: 'toggle-status' ,
        id : changeStatus.id
    })
}
// show the error
}


const setEditeItemHandler = async (editItem)=>{

let res = await fetch(`https://67b44dcb392f4aa94faa41ee.mockapi.io/api/v1/todos/${editItem.id}` , {
    method: 'put' ,
    headers : {'content-type':'application/json'},
    body : JSON.stringify(
          {
            title :  editItem.title
        }
    ),
})
if(res.ok){
    todoDispatcher({
        type : 'update-todos' ,
        id : editItem.id ,
        title: editItem.title
    })
}
}



   const setNewInputValueHandler = ()=>{
    setInputValue(event.target.value)
   }

   const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value != '') {

        let newTodo = {
            id : todo.id,
            title : event.target.value,
            status :todo.status
        }
        setEditeItemHandler(newTodo)
        setEditMode(false)
    }
  };
//   useEffect(() =>{
//     console.log(`component created ${todo.title}`)
//     return () =>
//         console.log(`component deleted ${todo.title}`)
//   } , [])
    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
         {
            editMode
            ?
            <div className="w-full flex items-center">
                <input type="text" value={inputValue} onChange={() =>setNewInputValueHandler()} onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-200 rounded" />
                <DeleteIcon className="ml-2" onClick={() =>setEditMode(false)} />
            </div>
            :
            (
            <div>
                <div>
                    <input type="checkbox" onChange={() => toggleTodoStatsHandler(todo)}  checked={todo?.status} className="" />
                    <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' : ''}`}>{todo?.title} </p>
                </div>
                <button type="button" className="absolute right-0 flex items-center space-x-1">
                    <EditIcon onClick={() => setEditMode(true)} />
                    <DeleteIcon onClick={() => deleteTodoHandler(todo)} />
                </button>
            </div>
            )
         }
         </li>
    )
}
