import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuidv5 from 'uuid';
import axios from 'axios'

export default class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e, dispatch) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        //Check for errors
        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }

        const newContact = {
            // id: uuidv5(),
            name,
            email,
            phone
        }

        axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        .then(resp => dispatch({ type: 'ADD_CONTACT', payload: resp.data }));

        // clear state
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit={e => { this.onSubmit(e, dispatch) }}>
                                    <TextInputGroup
                                        label="Name" name="name" value={name} placeholder="Enter name..." onChange={this.onChange} error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Email" name="email" value={email} type="email" placeholder="Enter email..." onChange={this.onChange} error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone" name="phone" value={phone} placeholder="Enter phone..." onChange={this.onChange} error={errors.phone}
                                    />
                                    <input type="submit" value="Add Contact" className="btn btn-info btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
