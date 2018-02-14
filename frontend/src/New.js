import React, { Component } from 'react';
import Form from './Form';

const REQUEST_URL = 'http://localhost:3030/messages.json'

class New extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  handleInputValue = (event) => {
    const field = event.target.name;
    this.state[field] = event.target.value;
    this.setState({
      [field]: this.state[field]
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          title: this.state.title,
          content: this.state.content
        }
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.props.history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const { title, content } = this.state;
    return (
      <div>
        <p>New Message</p>
        <Form
          submitValue='Submit'
          title={ title } 
          content={ content }
          parentSubmit={ this.handleSubmit } 
          parentInputValue={ this.handleInputValue } />
      </div>
    );
  }
}

export default New;
