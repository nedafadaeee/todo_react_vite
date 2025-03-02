import { useContext } from "react";
import TodoListItems from "./TodoListItems";
import { TodoContext } from "./context/TodoContext";

export default function MakeTodoList({todos}){

    //const {todos} = useContext(TodoContext);
    return (
        <ul className="list-reset">

         { todos.map((items) => (  <TodoListItems  key={items.id} todo={items} />)) }

        </ul>
    )
}
