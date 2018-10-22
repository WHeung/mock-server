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
    return (
      <Form onSubmit={this.handleSaveMock}>
        <Form.Item label="name" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('name', validConfig)(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="describe" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('describe', validConfig)(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="url" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('url', validConfig)(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="method" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('method', validConfig)(
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
