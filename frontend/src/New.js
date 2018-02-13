import React, { Component } from 'react';

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
    .then((responseData) => {
      this.props.history.push('/');
    });
  }

  render() {    
   const { title, content } = this.state;
   return (
     <div>
       <p>New Message</p>
       <div>
         <form onSubmit={ this.handleSubmit }>
           <label>title:</label>
           <input type="text" name="title" value={ title } onChange={ this.handleInputValue } />
           <label>content:</label>
           <textarea name="content" value={ content } onChange={ this.handleInputValue } />
           <input type="submit" value="Submit" />
         </form>
       </div>
     </div>
   );
 }
}

export default New;
