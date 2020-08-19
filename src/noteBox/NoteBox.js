import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './NoteBox.css';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import config from '../config';

export default class NoteBox extends Component {
    static contextType = AppContext;
    
    handleDelete = e => {
        const id = this.props.id;
        e.preventDefault();

        fetch(fetch(`${config.API_ENDPOINT}/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },    
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
        })
        .then(() => {
            this.context.handleNoteDeleteUpdate(id)
        })
        .catch(error => {
            console.log(error)
        })
        )}

    render() {
        return (
            <div>
                <Route key={this.props.id}
                       render={() => {
                        return (
                            <li className="note-link-box">
                                <Link to={`/${this.props.folder_id}/${this.props.id}`}>
                                    <h1>{this.props.name}</h1>
                                </Link>
                                <button 
                                    className="button-delete"
                                    onClick={this.handleDelete}>Delete
                                </button>
                            </li>
                        )
                        }}
                />
            </div>
        )
    }
}

NoteBox.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    handleDelete: PropTypes.func
}