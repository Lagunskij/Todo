const initialState: InitialStateType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: InitialStateType = initialState , action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR' :
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const )
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const )



type ActionsType =
    | SetErrorActionType
    | SetStatusActionType


export type SetStatusActionType = ReturnType<typeof setStatusAC>;
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}
