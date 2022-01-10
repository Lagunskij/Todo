import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from './TodolistsLists'
import {ErrorSnackBar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./reducers/app-reducer";

function App() {
const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <ErrorSnackBar/>
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
            <div style={{position:'absolute', width:'100%'}}>
                { status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            {/*{ status === 'loading' && <LinearProgress color="secondary"/>}*/}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App
