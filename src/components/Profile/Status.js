import React from "react";

export class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditmode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    changeStatus = (e) => {
        this.setState({status:  e.currentTarget.value})
       
    }
    render() {
        debugger
        return (
            <div>
                {(this.state.editMode)
                    ? <div>
                        <input onChange={this.changeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                    </div>
                    : <div>
                        <span  onDoubleClick={this.activateEditmode} >{this.props.status}</span>
                    </div>
                }


            </div>
        )

    }
}