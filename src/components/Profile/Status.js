import React, { useEffect, useState } from "react";
import { getStatus } from '../../selectors/profileSelector'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatusThunk } from '../../redux/profile-reducer.ts'

export const ProfileStatus = (props) => {
    const dispatch = useDispatch()

    const status = useSelector(getStatus)

    const updateStatus = (status) => {
        return dispatch(updateStatusThunk(status))
    }

    let [editMode, setEditMode] = useState(false)
    let [currentStatus, setStatus] = useState(status)
    let activateEditmode = () => {
        if (props.isOwner) {
            setEditMode(true)
            console.log(editMode);
        }

    }
    let deactivateEditMode = () => {
        try {
            updateStatus(currentStatus)
            setEditMode(false)
        } catch {
            alert ('some error')
        }

    }
    let changeStatus = (e) => {
        setStatus(e.currentTarget.value)

    }

    useEffect (() => {
        setStatus(status)
    }, [props.status])

        return (
            <div>
                {(editMode)
                    ? <div>
                        <input onChange={changeStatus} autoFocus={true} onBlur={deactivateEditMode} value={currentStatus}></input>
                    </div>
                    : <div>
                        <span  onDoubleClick={activateEditmode} >{status || '-------------'}</span>
                    </div>
                }


            </div>
        )

}