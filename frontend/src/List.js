import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const REQUEST_URL = 'http://localhost:3030/messages.json'
 
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    };
  }
  
  componentWillMount() {
    this.fetchData()
  }
  
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          messages: responseData,
        })
      })
  }
  
  render(){
    const { messages } = this.state;
    return(
      <div>
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
               <tr key={message.id}>
                 <td>{message.title}</td>
                 <td>{message.content}</td>
                 <td><Link to={ '/message/' + message.id }>show</Link></td>
                 <td>edit</td>
                 <td>destroy</td>
               </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default List;
