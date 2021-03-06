import React, { Component } from 'react';
import "./Note.css";
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import config from '../config';

export default class Note extends Component {
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
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
        )}

    render() {
        return (
            <div className="single-note">
                <button onClick={() => {this.props.history.goBack()}}>
                    Go Back
                </button>
                <br></br>

                <div className="note-link-box">
                    <h1>{this.props.note_name}</h1>
                    <button 
                        className="button-delete"
                        onClick={this.handleDelete}
                    >
                        Delete
                    </button>
                </div>

                <div className="content">
                    <p>{this.props.content}</p>
                </div>
            </div>
        )}
    }

    Note.propTypes = {
        note_name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        handleDelete: PropTypes.func
    }