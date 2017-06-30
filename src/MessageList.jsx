import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    var messageArray = this.props.messages;
    return (
      <main className="messages">
        {messageArray.map((message) => {
          if(message.type === "postMessage") {
            return <Message key={message.id} content={message.content} username={message.username} /> 
          } 
          else if(message.type === "postNotification") {
             return <main className="message-notification"><Message key={message.id} content={message.content} /></main>
          } 
     
          })
        }    
      </main>
    );
  }
}
export default MessageList;
