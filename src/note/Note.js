import React, { Component } from 'react'
import "./Note.css"
import AppContext from '../AppContext'

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType=AppContext;

    handleDelete = e => {
        const id = this.props.id;
        e.preventDefault();

        fetch(fetch(`http://localhost:9090/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },    
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.props.onDeleteNote(id)
        })
        .then(this.props.history.push('/'))
        .catch(error => {
            console.log(error)
        })
        )}

    render() {
        return (
            <div>
                <div className="note-box">
                    <h1>{this.props.name}</h1>
                    <button 
                        className="delete-button"
                        onClick={this.handleDelete}>Delete Note</button>
                </div>
                <div className="note-content">
                    <p>{this.props.content}</p>
                </div>
                <button 
                    className="go-back-button"
                    onClick={this.props.onClickGoBack}>Go Back to Notes</button>
            </div>
        )}
    }
