import TodoList from "./TodoList";

export default function NewTodoInput({addTodoTitle}) {
    
    const handleKeyDownInput = (event) => {

        if (event.key === 'Enter' && event.target.value != '') {
            addTodoTitle(event.target.value)
            event.target.value = '';
        }
      };
    return(
         <div className="relative">
                <input type="text" placeholder="What needs to be done today?" onKeyDown={handleKeyDownInput}
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
        </div>
    )
    
}