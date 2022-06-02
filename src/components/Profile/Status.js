import React, { useEffect, useState } from "react";

export const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    let activateEditmode = () => {
        if (props.isOwner) {
            setEditMode(true)
            console.log(editMode);
        }

    }
    let deactivateEditMode = () => {
        try {
            props.updateStatus(status)
            setEditMode(false)
        } catch {
            alert ('some error')
        }

    }
    let changeStatus = (e) => {
        setStatus(e.currentTarget.value)

    }

    useEffect (() => {
        setStatus(props.status)
    }, [props.status])

        return (
            <div>
                {(editMode)
                    ? <div>
                        <input onChange={changeStatus} autoFocus={true} onBlur={deactivateEditMode} value={status}></input>
                    </div>
                    : <div>
                        <span  onDoubleClick={activateEditmode} >{props.status || '-------------'}</span>
                    </div>
                }


            </div>
        )

}