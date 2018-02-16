import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickable: 'disabled'
    };
  }
  
  handleInputValue = (event) => {
    this.props.parentInputValue(event);
    this.setState({
      clickable: event.target.value.trim() == '' ? 'disabled' : false
    });
  }
  
  render() {
    const { title, content, submitValue } = this.props;
    const { clickable } = this.state;
    return (
      <div>
        <form onSubmit={ this.props.parentSubmit }>
          <label>title:</label>
          <input type="text" name="title" value={ title } onChange={ this.handleInputValue } />
          <label>content:</label>
          <textarea name="content" value={ content } onChange={ this.props.parentInputValue } />
          <input type="submit" value={ submitValue } disabled={ clickable } />
        </form>
      </div>
    );
  }
}

export default Form;
