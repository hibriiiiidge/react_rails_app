import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Table extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { messages, parentHundleDestroy } = this.props;
    
    return(
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
               <td><a href="javascript:void(0)" onClick={ () => { if (window.confirm('本当に削除しますか?')) parentHundleDestroy(event, message.id) } }>destroy</a></td>
             </tr>
            );
          }) }
        </tbody>
      </table>
    );
  }
}

export default Table;
