import React, { Component } from 'react';
import Form from './Form';

const REQUEST_URL_EDIT = 'http://localhost:3030/messages/';

class Edit extends Component {
  constructor(props) {
    super(props)
    const message_id = parseInt(this.props.match.params.id, 10)
    this.state = {
      id: message_id,
      title: '',
      content: '',
    };
  }
 
  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL_EDIT + this.state.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          title: responseData.title,
          content: responseData.content
        })
      })
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
    fetch(REQUEST_URL_EDIT + this.state.id, {
      method: 'PUT',
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
    .then((responseData) => {
      this.props.history.push('/');
    })    
  }

  render(){
    const { title, content } = this.state;
    return(
      <div>
        <p>Edit Message</p>
        <Form
          submitValue='Update'
          title={ title } 
          content={ content }
          parentSubmit={ this.handleSubmit } 
          parentInputValue={ this.handleInputValue } />
      </div>
    );
  }
}

export default Edit;
