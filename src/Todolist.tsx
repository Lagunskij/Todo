import React, {useCallback, useEffect} from "react";
import {FilterValuesType, TodolistDomainType} from "./reducers/todolist-reducer";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/api";


export type todolistPropsType = {
    todolist: TodolistDomainType
    // id: string
    // title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}


export const Todolist = React.memo((props: todolistPropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id));
    }, [props.todolist.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onChangeTodolistTitleHandler = useCallback((newValue: string) => {
        props.changeTodolistTitle(props.todolist.id, newValue)
    }, [props])


    const onChangeFilterAll = useCallback(() => props.changeFilter('all', props.todolist.id), [props])
    const onChangeFilterActive = useCallback(() => props.changeFilter('active', props.todolist.id), [props])
    const onChangeFilterCompleted = useCallback(() => props.changeFilter('completed', props.todolist.id), [props])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }


    return <div>
        <h3><EditableSpan title={props.todolist.title} onChange={onChangeTodolistTitleHandler}/>

            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    todolistId={props.todolist.id}
                    key={t.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeTaskStatus}
                    changeTitle={props.changeTaskTitle}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? "outlined" : 'text'}
                    onClick={onChangeFilterAll}
                    color={"primary"}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? "outlined" : 'text'}
                    onClick={onChangeFilterActive}
                    color={"secondary"}
            >Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? "outlined" : 'text'}
                    onClick={onChangeFilterCompleted}
                    color={"inherit"}
            >Completed
            </Button>
        </div>

    </div>
})

