
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfClients: 0,
      currentUser: {
        name: 'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
    }
    this.newMessage=this.newMessage.bind(this);
    this.changeUsername=this.changeUsername.bind(this);
  }

  sendMessageToServer(message) {
    console.log('Message', message);
    this.socket.send(message);
  }

  componentDidMount() {
  console.log('component did mount');
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('message', (event) => {
      var messages = event.data;
      messages = JSON.parse(messages);      
      console.log("HI", messages)
      switch(messages.type){
        case "postMessage":
          const newMessages = this.state.messages.concat(messages);
          console.log("NEW MESSSSSSSAGE", newMessages)
          this.setState({messages: newMessages});
          break;
        case "postNotification":
          const newNotification = this.state.messages.concat(messages)
          this.setState({messages: newNotification})
          console.log("id", messages.id)
          break;
        case "clientsize":
          const numberConnected = messages.clientNum;
          this.setState({numberOfClients: numberConnected})
      }
    });
  }
  newMessage(type, username, content) { 
    console.log("OLD", this.state.currentUser.name)
    const newMessage = {type:type.type, username:username, content:content};
    console.log("TYPE", newMessage)
    this.sendMessageToServer(JSON.stringify(newMessage)); 
  }
  changeUsername(type, content, newUser) {
    const newNotification = {type:type.type, content:content}
    this.sendMessageToServer(JSON.stringify(newNotification));
    this.setState({currentUser:{name:newUser}});
    console.log("I CHANGED", this.state.currentUser.name)
  }
 
  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} changeUsername={this.changeUsername}/>
        <MessageList messages={this.state.messages} />
        <Navbar numberOfClients={this.state.numberOfClients}/>
      </div>
    );
  }
}
export default App;
