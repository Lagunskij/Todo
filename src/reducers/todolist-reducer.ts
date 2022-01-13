import {todolistsAPI, TodolistType} from '../api/api'
import {Dispatch} from 'redux'
import {RequestStatusType, setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "./app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'));
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data));
                dispatch(setStatusAC('succeeded'));
            })
    }
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId));
            dispatch(setStatusAC('succeeded'));
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));

    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setStatusAC("succeeded"));
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))
            }

        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));
    todolistsAPI.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title));
            dispatch(setStatusAC('succeeded'));
        })
}


// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetErrorActionType
    | SetStatusActionType
    | changeTodolistEntityStatusActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
