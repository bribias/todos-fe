import React, { Component } from 'react';
import { addTodos, completeTodo, getTodos } from './fetch-utils';

export default class TodosPage extends Component {
    state = {
        todos: [],
        complete: ''
    }

    componentDidMount = async () => {
        await this.fetchTheThing()
    }

    fetchTheThing = async () => {
        const todos = await getTodos(this.props.token)
        this.setState({ todos: todos })
    }

    handleSubmit = async e => {
        e.preventDefault();

        await addTodos(this.state.complete, this.props.token);

        await this.fetchTheThing()
    }

    handleCompleteTodo = e => {
        this.setState({ complete: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        To-Do
                        <input onChange={this.handleCompleteTodo} />
                    </label>
                    <button>Add To-Do</button>
                </form>
                <div>
                    {
                        this.state.todos.map(todo => <p className={todo.completed ? 'completed' : 'not complete'} key={`${todo.todo}${todo.id}`}
                        
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
