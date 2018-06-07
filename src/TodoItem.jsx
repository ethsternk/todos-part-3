import React, { Component } from 'react';

class TodoItem extends Component {
    state = {
        completed: this.props.completed
    }

    handleCheck = (event) => {
        this.setState({
            completed: event.target.checked
        })
    }

    render() {
        return (
            <li className={this.state.completed ? 'completed' : 'not-completed'} id={this.props.id}>
                <div className="view">
                    {this.props.completed
                        ? <input className="toggle" defaultChecked type="checkbox" onClick={this.handleClick} />
                        : <input className="toggle" type="checkbox" onClick={this.handleCheck} />
                    }
                    <label>{this.props.title}</label>
                    {this.props.children}
                </div>
            </li>
        )
    }
}

export default TodoItem;