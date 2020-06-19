import React, { Component } from 'react'
import './AddFolder.css'
import AppContext from '../AppContext'
import ValidationError from '../validationError/ValidationError';
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
    constructor(props){
        super(props)
        this.state = {
            folderName: ""
        };
    }
    
    static contextType = AppContext;

    updateFolderName(name) {
        this.setState({
            folderName: name
        })
    }

    validateFolderName() {
        const name = this.state.folderName;
        if (name.length === 0) {
            return 'Folder Name is required!';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.folderName })
        })  
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then((folder) => {
            this.context.handleNewFolder(folder)
            this.props.toggleForm()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={this.handleSubmit}>
                <label htmlFor="folderName">Folder Name:</label>
                <input 
                    type="text"
                    name="folderName"
                    id="folderName"
                    onChange={e => this.updateFolderName(e.target.value)}
                    required
                />
                <ValidationError message={this.validateFolderName()} />
                <button 
                    type="submit"
                    className="submit-button"
                    disabled={!this.state.folderName}>
                    Add New Folder
                </button>
            </form>
        )
    }
}

AddFolder.propTypes = {
    handleSubmit: PropTypes.func,
    updateFolderName: PropTypes.func
}