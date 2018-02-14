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
      .then((response) => {
        // 4xx系, 5xx系エラーのときには response.ok = false になる
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
                 <td><Link to={ '/message/' + message.id }>Show</Link></td>
                 <td><Link to={ '/message/' + message.id + '/edit' }>Edit</Link></td>
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
