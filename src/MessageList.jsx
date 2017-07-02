import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    //Renders the array given to it by its parent App
    var messageArray = this.props.messages;
    return (
      //Maps a new array with the latest state of the Parent App
      //If postNotification it will add a new notification along with the messages
      <main className='messages'>
        {messageArray.map((message) => {
          if(message.type === 'postMessage') {
            return <Message key={message.id} content={message.content} username={message.username} /> 
          } 
          else if(message.type === 'postNotification') {
             return <main className='message-notification'><Message key={message.id} content={message.content} /></main>
          } 
     
          })
        }    
      </main>
    );
  }
}
export default MessageList;
