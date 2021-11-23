import React, {useCallback} from "react";
import {filterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button,IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: filterValuesType
    removeTodolist: (todolistId: string) => void
}


export const Todolist = React.memo((props: todolistPropsType) => {


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onChangeTodolistTitleHandler = useCallback((newValue: string) => {
        props.changeTodolistTitle(props.id, newValue)
    }, [props])


    const onChangeFilterAll = useCallback(() => props.changeFilter(props.id, 'all'), [props])
    const onChangeFilterActive = useCallback(() => props.changeFilter(props.id, 'active'), [props])
    const onChangeFilterCompleted = useCallback(() => props.changeFilter(props.id, 'completed'), [props])

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>

            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    todolistId={props.id}
                    key={t.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeTaskStatus}
                    changeTitle={props.changeTaskTitle}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
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
})

