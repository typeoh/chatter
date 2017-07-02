//Importing components
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

//Defining the class for App, setting the default environment 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfClients: 0,
      currentUser: {
        name: 'Bob'
      }, 
      messages: [],
    }
    this.newMessage=this.newMessage.bind(this);
    this.changeUsername=this.changeUsername.bind(this);
  }

  sendMessageToServer(message) {
    this.socket.send(message);
  }
  //Lifecycle componentDidMount which, if true, 
  //connects server to the websocket, 
  //receives messages from client server,
  //and sets the state with the message contents dependent on type. 
  componentDidMount() {
  console.log('component did mount');
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('message', (event) => {
      var messages = event.data;
      messages = JSON.parse(messages);      
      switch(messages.type){
        case "postMessage":
          const newMessages = this.state.messages.concat(messages);
          this.setState({messages: newMessages});
          break;
        case "postNotification":
          const newNotification = this.state.messages.concat(messages)
          this.setState({messages: newNotification})
          break;
        case "clientsize":
          const numberConnected = messages.clientNum;
          this.setState({numberOfClients: numberConnected})
      }
    });
  }
  //Function that takes in the message exported from Chatbar and 
  //sends the newMessage object to server through the sendMessageToServer function 
  newMessage(type, username, content) { 
    const newMessage = {type:type.type, username:username, content:content};
    this.sendMessageToServer(JSON.stringify(newMessage)); 
  }
  //Function that takes in the notification exported from Chatbar and 
  //sends the Notification object to server through the sendMessageToServer function. 
  //Also sets state of the new username in the state object 
  //
  changeUsername(type, content, newUser) {
    const newNotification = {type:type.type, content:content}
    this.sendMessageToServer(JSON.stringify(newNotification));
    this.setState({currentUser:{name:newUser}});
  }
 //Renders all components and exports the state into each component while rendering
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
