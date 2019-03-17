import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios'

export default class Contact extends Component {
    state = {
        showContactInfo: false
    };

    toggleInfo = () => {
        this.setState({showContactInfo: !this.state.showContactInfo});
    }

    deleteContact = async (id, dispatch) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        
        dispatch({type: 'DELETE_CONTACT', payload: id});
    };

    render() {
        const {id, name, email, phone} = this.props.contact;
        const {showContactInfo} = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name + ' '}
                                <i
                                    onClick={this.toggleInfo}
                                    className="fas fa-sort-down"
                                    style={{cursor: 'pointer'}}
                                />
                                <i
                                    onClick={this.deleteContact.bind(this, id, dispatch)}
                                    className="fas fa-times float-right"
                                    style={{cursor: 'pointer', color: 'red'}}
                                />
                                <Link to={`contact/edit/${id}`}>
                                    <i
                                        className="fas fa-pencil-alt float-right"
                                        style={{cursor: 'pointer', color: 'black', marginRight: '1rem'}}
                                    />
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                                ) : null
                            }
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}