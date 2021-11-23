import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {taskPropsType} from "./Todolist";


type TaskPropsType = {
    todolistId: string
    task: taskPropsType
    removeTask: (taskId: string, todolistId: string) => void;
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTaskStatus = e.currentTarget.checked;
        props.changeStatus(props.todolistId, props.task.id, newTaskStatus)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTitle(props.task.id, newValue, props.todolistId)
    }, [props])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ''}>

        <Checkbox color={"primary"}
                  checked={props.task.isDone}
                  onChange={onChangeStatusHandler}/>

        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
