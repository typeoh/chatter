const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('connected')  
  //number of clients logged in
  var clientNumber = wss.clients.size;
  var clients = {type:"clientsize", clientNum:clientNumber}
  console.log("NUMBER", clients);
  wss.broadcast(JSON.stringify(clients));

  ws.on('message', (message) => {
    const parsedMessage = (JSON.parse(message))
    console.log("PARSED", parsedMessage)
    switch(parsedMessage.type){
      case "postMessage":
        var newMessage = {
          id: uuidv1(),
          type: parsedMessage.type, 
          username: parsedMessage.username,
          content: parsedMessage.content,  
        }
        wss.broadcast(JSON.stringify(newMessage))
      break;
      case "postNotification":
      var incomingNotification = {
        id: uuidv1(),
        type: parsedMessage.type, 
        content: parsedMessage.content,
      }
      break;
    }
    wss.broadcast(JSON.stringify(incomingNotification))
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
  var clientGone = wss.clients.size;
  wss.broadcast(JSON.stringify(clientNumber));
});