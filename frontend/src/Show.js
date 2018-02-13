import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const REQUEST_URL_SHOW = 'http://localhost:3030/messages/';

class Show extends Component {
  constructor(props) {
    super(props)
    const message_id = parseInt(this.props.match.params.id, 10)
    this.state = {
      id: message_id,
      message: ''
    };
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL_SHOW + this.state.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          message: responseData
        });
      })
  }

  render(){
    const { message } = this.state;
    return(
      <div key={message.id}>
        <div>
          <b>Title</b>
          <div>{message.title}</div>
        </div>
        <div>
          <b>Content</b>
          <div>{message.content}</div>
        </div>
        <div><Link to={'/message/' + message.id + '/edit'}>edit</Link></div>
      </div>
    );
  }
}

export default Show;
