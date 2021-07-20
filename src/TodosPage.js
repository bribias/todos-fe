import React, { Component } from 'react';
import { addTodos,  getTodos, completeTodo } from './fetch-utils';

export default class TodosPage extends Component {
    state = {
        todos: [],
        name: ''
    }

    fetchTheThing = async () => {
        const todos = await getTodos(this.props.token)
        this.setState({ todos: todos })
    }
    
    componentDidMount = async () => {
        await this.fetchTheThing()
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await addTodos(this.state.name, this.props.token);
        await this.fetchTheThing()
    }

    handleCompleteTodo = (e) => {
        this.setState({ name: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Next thing to do...
                        <input onChange={this.handleCompleteTodo} />
                    </label>
                    <button>Add To-Do</button>
                </form>
                <div>
                    {
                        this.state.todos.map(todo => <p className={todo.completed
                            ? 'completed'
                            : 'not complete'}
                            key={`${todo.name}${todo.id}`}
                            onClick={async () => {
                                await completeTodo(todo.id, this.props.token)
                                await this.fetchTheThing()
                            }}
                        >
                            {todo.todo}
                        </p>)
                    }
                    </div>
            </div>
        )
    }
}
