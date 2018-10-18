import React, { Component } from 'react'
import logo from './assets/img/logo.png'
import { Route } from 'react-router-dom'
import MockRoute from './components/mock'
import 'antd/dist/antd.css'

import styles from './App.styl'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="routes">
          <Route path="/admin" component={MockRoute}/>
        </div>
      </div>
    );
  }
}

export default App;
