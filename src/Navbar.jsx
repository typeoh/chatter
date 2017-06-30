import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="client-count">{this.props.numberOfClients} user(s) online</a>
    </nav>
    );
  }
}
export default Navbar;
