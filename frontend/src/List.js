import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const REQUEST_URL = 'http://localhost:3030/messages.json'
const REQUEST_URL_DELETE = 'http://localhost:3030/messages/'
const REQUEST_URL_SEARCH = 'http://localhost:3030/messages/search'
 
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      searchTitle: '',
    };
  }
  
  componentWillMount() {
    this.fetchData()
  }
  
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          messages: responseData
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  hundleDestroy = (event, message_id) => {
    event.preventDefault();
    const messages = this.state.messages;
    const removeMessage = (msg, i) => {
      if (msg.id==message_id) messages.splice(i,1);
    }
    
    messages.some(removeMessage);
    
    this.setState({
      messages: messages
    })
    
    fetch(REQUEST_URL_DELETE + message_id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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
  
  handleInputSearchTitle = (event) => {
    event.preventDefault();
    const searchTitle = event.target.value;
    fetch(REQUEST_URL_SEARCH, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: { search: searchTitle }
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        messages: responseData
      })
    })
    .catch((err) => {
      console.error(err);
    });
    
    this.setState({
      searchTitle: searchTitle
    });
  }
  
  render(){
    const { messages } = this.state;
    return(
      <div>
        <div>
          <label>SearchTitle:</label>
          <input type="text" name="searchTitle" value={ this.state.searchTitle } onChange={ this.handleInputSearchTitle } />
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { messages.map((message) => {
              return (
               <tr key={ message.id }>
                 <td>{ message.title }</td>
                 <td>{ message.content }</td>
                 <td><Link to={ '/message/' + message.id }>Show</Link></td>
                 <td><Link to={ '/message/' + message.id + '/edit' }>Edit</Link></td>
                 <td><a href="javascript:void(0)" onClick={ () => { if (window.confirm('本当に削除しますか?')) this.hundleDestroy(event, message.id) } }>destroy</a></td>
               </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}
export default List;
