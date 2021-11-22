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
    taskId: string
    todolistId: string,
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
            stateCopy[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false};

            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case 'CHANGE-STATUS' : {
            const stateCopy = {...state};
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TITLE' : {
            const stateCopy = {...state};
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title
            }
            return stateCopy
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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string,): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string,): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}
