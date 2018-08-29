import { Todo } from "./todo.model";
export class Project {
    name: String;
    constructor(name: String){
        this.name = name;
    }
    public GetName(){
        return this.name;
    }
}