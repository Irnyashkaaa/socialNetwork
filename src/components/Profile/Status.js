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
        this.props.updateStatus(this.state.status)
        this.setState({editMode: false})

    }
    changeStatus = (e) => {
        this.setState({status:  e.currentTarget.value})

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
    render() {
        return (
            <div>
                {(this.state.editMode)
                    ? <div>
                        <input onChange={this.changeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                    </div>
                    : <div>
                        <span  onDoubleClick={this.activateEditmode} >{this.state.status || '-------------'}</span>
                    </div>
                }


            </div>
        )

    }
}