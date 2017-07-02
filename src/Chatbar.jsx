
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        value: '',
      };
    }
//On key press enter, handleChange takes the content of the content Chatbar and assigns a postMessage type
  handleChange = (event) => {
    if(event.key === 'Enter') {
        this.props.newMessage({"type": "postMessage"}, this.refs.username.value, this.refs.content.value)     
    }
  }
//On key press enter, handleNewUser takes the content of the username Chatbar and assigns a postNotification type
//And assembles a string with the notification containing old and new usernames
//Calls the changeUsername function on the new object 
  handleNewUser = (event) =>{
    if(event.key === 'Enter') {
      var content = (this.props.currentUser.name + " changed their name to " + this.refs.username.value)
      const newUser = this.refs.username.value;
      this.props.changeUsername({"type": "postNotification"}, content, newUser)
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input ref="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this.handleNewUser}/>
        <input ref="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleChange}/>
      </footer>
    );
  }
}
export default ChatBar;
