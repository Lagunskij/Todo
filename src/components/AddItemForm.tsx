import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type addItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: addItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
        } else {
            setError("Title is requre!!!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null)
            setError(null);
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div>
        <TextField variant={"outlined"}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label={"Title"}
                   helperText={error}
                   disabled={disabled}
        />
        <IconButton color={"primary"} onClick={addItemHandler}>
            <AddBox/>
        </IconButton>
    </div>
});
