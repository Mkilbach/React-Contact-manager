import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuidv5 from 'uuid';
import axios from 'axios';

export default class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const {name, phone, email} = res.data;
        this.setState({
            name: name,
            email: email,
            phone: phone
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

     onSubmit = async (e, dispatch) => {
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

        const updContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
        dispatch({type: 'UPDATE_CONTACT', payload: res.data});

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
                            <div className="card-header">Edit Contact</div>
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
                                    <input type="submit" value="Edit Contact" className="btn btn-info btn-block" />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
