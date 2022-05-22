import React from "react";

export class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditmode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
    }
    render() {
        return (
            <div>
                {(this.state.editMode)
                    ? <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}></input>
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditmode} >{this.props.status}</span>
                    </div>
                }


            </div>
        )

    }
}