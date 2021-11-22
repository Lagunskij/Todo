import React, {ChangeEvent} from "react";
import {filterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export type todolistPropsType = {
    id: string
    title: string
    tasks: Array<taskPropsType>
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: filterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: filterValuesType
    removeTodolist: (todolistId: string) => void
}


export const Todolist = (props: todolistPropsType) => {


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onChangeFilterAll = () => props.changeFilter(props.id, 'all')
    const onChangeFilterActive = () => props.changeFilter(props.id,'active')
    const onChangeFilterCompleted = () => props.changeFilter(props.id,'completed')
    const onChangeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.id, newValue)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>

                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newTaskStatus = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newTaskStatus, props.id)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <div key={t.id} className={t.isDone ? "is-done" : ''}>

                            <Checkbox color={"primary"} checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "outlined" : 'text'}
                        onClick={onChangeFilterAll}
                        color={"primary"}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? "outlined" : 'text'}
                        onClick={onChangeFilterActive}
                        color={"secondary"}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? "outlined" : 'text'}
                        onClick={onChangeFilterCompleted}
                        color={"inherit"}
                >Completed
                </Button>
            </div>
        </div>
    )
}
