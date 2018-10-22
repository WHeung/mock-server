import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'
import CallApi from '@/util/ajax'
import styles from './AddOptionForm.styl'
var CodeMirror = require('react-codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/lib/codemirror.css')

class optionForm extends Component {
  constructor() {
    super()
    this.state = {
      mockOption: {
        name: '',
        desc: '',
        template: ''
      }
    }
  }
  handleSaveMock = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return
      CallApi('UPDATE_MOCK')
    })
    return
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const validConfig = {
      rules: [{required: true, message: '不能为空!'}]
    }
    const cmOptions = {
      cursorHeight: 0.85,
      mode: 'javascript'
    }
    return (
      <Form onSubmit={this.handleSaveMock}>
        <Form.Item label="name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('name', validConfig)(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="desc" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('desc', validConfig)(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="template" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
          {getFieldDecorator('template', validConfig)(
            <CodeMirror className={styles.cmWrap} options={cmOptions}></CodeMirror>
            // <Input />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    )
  }
}
const OptionForm = Form.create()(optionForm)

export default OptionForm
