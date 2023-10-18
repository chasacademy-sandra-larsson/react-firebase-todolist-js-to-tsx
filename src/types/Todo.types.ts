export interface ITodo {
    id: string;
    desc: string;
    completed: boolean;
  }

 export interface INewTodo extends Omit<ITodo, "id">{}
  
  