import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setErrorAC} from "../../reducers/app-reducer";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackBar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    //  const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null));
    };
    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}
