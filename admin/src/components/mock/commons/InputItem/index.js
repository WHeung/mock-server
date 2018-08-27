
import React, { Component } from 'react'
import styles from './index.styl'

class InputItem extends Component {
  render () {
    return (
      <div className={styles.inputWrap}>
        <div className={styles.name}>{this.props.name}</div>
        {this.props.children}
      </div>
    )
  }
}

export default InputItem;

