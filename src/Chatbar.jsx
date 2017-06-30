
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        value: '',
      };
    }

  handleChange = (event) => {
    if(event.key === 'Enter') {
        this.props.newMessage({"type": "postMessage"}, this.refs.username.value, this.refs.content.value)     
    }
  } 
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
