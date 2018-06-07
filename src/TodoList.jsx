import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

class TodoList extends Component {
    render() {
        return (
            <ul className="todo-list">
                {this.props.todos.map(todo =>
                    <TodoItem id={todo.id} key={todo.id} title={todo.title} completed={todo.completed}>
                        {this.props.children}
                    </TodoItem>)}
            </ul>
        )
    }
}

export default TodoList;