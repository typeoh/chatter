// Requirements
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
const PORT = 3001;

// Second express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//WebSockets server
const wss = new SocketServer({ server });

//Broadcasts each message and notification to all connected clients 
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('connected')  
  //Broadcasts number of clients connected to server
  var clientNumber = wss.clients.size;
  var clients = {type:"clientsize", clientNum:clientNumber}
  wss.broadcast(JSON.stringify(clients));

  //On receiving message from client, parses message based and 
  //organizes information based on type
  //and adds a unique ID key 
  ws.on('message', (message) => {
    const parsedMessage = (JSON.parse(message))
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

  //Call back that closes socket 
  ws.on('close', () => console.log('Client disconnected'));
});