import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    var messageArray = this.props.messages;
    return (
      <main className="messages">
          {messageArray.map((message) => {
              return <Message key={message.id} content={message.content} username={message.username} /> 
              })
            }
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </main>
    );
  }
}
export default MessageList;
