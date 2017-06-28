
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
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.newMessage=this.newMessage.bind(this);
  }
  componentDidMount() {
  console.log('componentDidMount <App />');
}
  newMessage(username, content) { 
    const newMessage = {id:Date.now(), username:username , content:content};  
    const messages = this.state.messages.concat(newMessage)   
    this.setState({messages:messages});
  }
 
 
// Add a new message to the list of messages in the data store

    // addNewMessage(username, content){


    // }

    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
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
