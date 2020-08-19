import React, { Component } from 'react'
import './AddFolder.css'
import AppContext from '../AppContext'
import ValidationError from '../validationError/ValidationError';
import PropTypes from 'prop-types';
import AddError from '../addError/AddError';
import config from '../config';

export default class AddFolder extends Component {
    constructor(props){
        super(props)
        this.state = {
            folder_name: "",
            touched: false
        };
    }
    
    static contextType = AppContext;

    updateFolder_name(name) {
        this.setState({
            folder_name: name,
            touched: true
        })
    }

    validateFolder_name() {
        const name = this.state.folder_name;
        if (name.length === 0) {
            return 'Folder Name is required!';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ folder_name: this.state.folder_name })
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
            alert("Could not add folder", error)
            console.log(error)
        })
    }

    render() {
        return (
            <AddError>
                <form className="add-folder-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="folder_name">Folder Name:</label>
                    <input 
                        type="text"
                        name="folder_name"
                        id="folder_name"
                        onChange={e => this.updateFolder_name(e.target.value)}
                        required
                    />
                    {this.state.touched && <ValidationError message={this.validateFolder_name()}/>}
                    <button 
                        type="submit"
                        className="submit-button"
                        disabled={!this.state.folder_name}
                    >
                        Add New Folder
                    </button>
                </form>
            </AddError>
        )
    }
}

AddFolder.propTypes = {
    handleSubmit: PropTypes.func,
    updateFolder_name: PropTypes.func,
    toggleForm: PropTypes.func
}