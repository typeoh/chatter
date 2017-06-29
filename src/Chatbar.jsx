
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        value: '',
      };
    }
// handleInput(event) {
//     const usernameInput = document.querySelector('chatbar-username');
//     const messageIn  put = document.querySelector('chatbar-message');
//   if(event.key === 'Enter') {
//     this.setState({
//       content: ''
//   })
  handleChange = (event) => {
    if(event.key === 'Enter'){
      this.props.newMessage(this.refs.username.value, this.refs.content.value)
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input ref="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this.handleChange}/>
        <input ref="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleChange}/>
      </footer>
    );
  }
}
export default ChatBar;
