
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    currentUser: {
      name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.newMessage=this.newMessage.bind(this);
  }

  sendMessageToServer(message) {
    console.log('Message', message);
    this.socket.send(message);
  }

  componentDidMount() {
  console.log('component did mount');
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('message', (event) => {
      const messages = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(messages);
      this.setState({messages:newMessages});
    });
}
  newMessage(username, content) { 
    const newMessage = {username:username, content:content}; 
    this.sendMessageToServer(JSON.stringify(newMessage)) 
  }
 
  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
        <MessageList messages={this.state.messages} />
        <Navbar />
      </div>
    );
  }
}
export default App;
