import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/api";


type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void;
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
    changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);


    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTitle(props.task.id, newValue, props.todolistId)
    }, [props])


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

        <Checkbox color={"primary"}
                  checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeStatusHandler}/>

        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
