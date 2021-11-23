import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string,
}

export type ChangeStatusActionType = {
    type: 'CHANGE-STATUS',
    todolistId: string,
    taskId: string,
    isDone: boolean

}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}


export type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeStatusActionType |
    ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId]
                .filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false};

            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case 'CHANGE-STATUS' : {
            state[action.todolistId] = state[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            return ({...state})
        }
        case 'CHANGE-TITLE' : {

            state[action.todolistId] = state[action.todolistId]
               .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            return ({...state})
        }
        case "ADD-TODOLIST" : {
            const stateCopy = {...state};
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state};
           delete stateCopy[action.id]
            return stateCopy
        }
        default:
          return   state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = ( todolistId: string, taskId: string, isDone: boolean): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string,): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}
