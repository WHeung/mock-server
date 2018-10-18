import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'
import CallApi from '@/util/ajax'

class mockForm extends Component {
  constructor() {
    super()
    this.state = {
      mockForm: {
        name: 'a',
        describe: '',
        url: '',
        method: ''
      }
    }
  }
  handleSaveMock = (e) => {
    e.preventDefault()
    const value = this.props.form.getFieldsValue()
    console.log(value)
    CallApi('UPDATE_MOCK', value)
    return
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSaveMock}>
        <Form.Item label="name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('name')(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="describe" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('describe')(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="url" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('url')(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="method" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('method')(
            <Input />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    )
  }
}
const MockForm = Form.create()(mockForm)

export default MockForm
