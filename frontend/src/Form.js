import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { title, content, submitValue } = this.props;
    return (
      <div>
        <form onSubmit={ this.props.parentSubmit }>
          <label>title:</label>
          <input type="text" name="title" value={ title } onChange={ this.props.parentInputValue } />
          <label>content:</label>
          <textarea name="content" value={ content } onChange={ this.props.parentInputValue } />
          <input type="submit" value={ submitValue } />
        </form>
      </div>
    );
  }
}

export default Form;
