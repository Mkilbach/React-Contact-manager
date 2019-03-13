import React, { Component } from 'react'

export default class Test extends Component {
    state = {
        title: '',
        body: ''
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => this.setState({
            title: data.title,
            completed: data.completed
        }));

    }

    render() {
        const { title, completed } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <p>{completed}</p>
            </div>
        )
    }
}