export default function todoReducer(todos , action){

    switch (action?.type) {
        case 'initial-todos' :
            return [
                ...todos,
                ...action?.todos
            ]
        case 'add':
            return [
                ...todos ,
                {
                    id : action?.id,
                    title: action?.title,
                    status: action?.status
                }
            ]
        case 'delete':
            return todos.filter((deleteItem)=>{
                return action?.id != deleteItem.id
            })

         case 'toggle-status' :
            return todos.map((todoItems) => {
                if(action.id == todoItems.id){
                    todoItems.status = ! todoItems.status
                }
                return todoItems;
            })

         case 'update-todos' :
            return todos.map((todoItems) => {
                if(action.id == todoItems.id){
                    todoItems.title = action.title
                }
                return todoItems;
             })

       default:
            break;
    }

}
