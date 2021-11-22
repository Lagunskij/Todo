import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {taskPropsType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";


export type filterValuesType = "all" | 'active' | 'completed'

export type todolistType =
    {
        id: string,
        title: string,
        filter: filterValuesType
    }

export type TasksStateType = {
    [key: string]: Array<taskPropsType>
}


function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'What to by',
            filter: 'all'
        }
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]:
            [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: false}
            ],
        [todolistId2]:
            [
                {id: v1(), title: 'MILK', isDone: true},
                {id: v1(), title: 'BEER', isDone: false},
                {id: v1(), title: 'VODKA', isDone: false}
            ]
    });

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id);
        dispatchToTodolist(action);
        dispatchToTasks(action)
    }

    function changeTodolistTitleHandler(id: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatchToTodolist(action);
    }

    function changeFilter(todolistId: string, filter: filterValuesType,) {
        const action = ChangeTodolistFilterAC(todolistId, filter)
        dispatchToTodolist(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodolist(action);
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitleHandler}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

