Chatty App
=====================

A clean, simple chat app that lets users chat in real-time with WebSockets and React

### Final Product
!["Homepage for Chatty"](https://github.com/typeoh/chatter/blob/master/images/Full_page.png)

### Usage

Clone chatty and create your own git repo.

```
git clone git@github.com:typeoh/chatter.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start both socket and client servers.

```
npm install
npm start
open http://localhost:3000
```

### Linting

This ChattyApp project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* Node-Sass
* Sockjs-client
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
