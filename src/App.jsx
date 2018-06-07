import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';
import TodoList from './TodoList.jsx';
import { Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  state = {
    todos: todoList.slice()
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      let maxId = Math.max.apply(Math, this.state.todos.map(function (o) { return o.id; }));
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: maxId + 1,
            title: event.target.value,
            completed: false
          }
        ]
      })
      event.target.value = "";
    }
  }

  handleDestroy = (event) => {
    let id = parseInt(event.target.parentElement.parentElement.id, 10);
    let index = this.state.todos.findIndex(element => {
      return element.id === id;
    })
    let newTodos = this.state.todos;
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  }

  handleClear = (event) => {
    let newTodos = this.state.todos;
    for (let i = 0; i < newTodos.length; i++) {
      let index = this.state.todos.findIndex(element => {
        return element.completed;
      })
      if (index > -1) {
        newTodos.splice(index, 1);
      }
    }
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What do you need to do today?" onKeyPress={this.handleKeyPress} autoFocus />
        </header>
        <section className="main">
          <Switch>
            <Route
              exact path='/'
              render={(props) =>
                <TodoList todos={this.state.todos}>
                  {<button className="destroy" onClick={this.handleDestroy}></button>}
                </TodoList>
              }
            />
            <Route
              path='/active'
              render={(props) =>
                <TodoList todos={this.state.todos.filter(todo => !todo.completed)}>
                  {<button className="destroy" onClick={this.handleDestroy}></button>}
                </TodoList>
              }
            />
            <Route
              path='/completed'
              render={(props) =>
                <TodoList todos={this.state.todos.filter(todo => todo.completed)}>
                  {<button className="destroy" onClick={this.handleDestroy}></button>}
                </TodoList>
              }
            />
          </Switch>
        </section>
        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <ul className="filters">
            <li>
              <Link to="/">
                All
              </Link>
            </li>
            <li>
              <Link to="/active">
                Active
              </Link>
            </li>
            <li>
              <Link to="/completed">
                Completed
              </Link>
            </li>
          </ul>
          <button className="clear-completed" onClick={this.handleClear}>Clear completed</button>
        </footer>
      </div>
    );
  }
}

export default App;
