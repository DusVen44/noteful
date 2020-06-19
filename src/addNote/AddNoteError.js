import React, { Component } from 'react'

export default class AddNoteError extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
        return (
            <div>
                <h2>Error has occured</h2>
            </div>
        );
        }
        return this.props.children
    }
}