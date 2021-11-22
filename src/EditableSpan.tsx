import React, {ChangeEvent, useState} from "react";

type editableSpanPropsType = {
    title: string
    onChange: (newValue: string)=> void
}

export const EditableSpan = (props: editableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activeEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activeViewMode}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>

}
