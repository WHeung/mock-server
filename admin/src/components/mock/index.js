import React, { Component } from 'react'
import styles from './index.styl'
import InputItem from './commons/InputItem'
import MockForm from './commons/AddMock'
import { Modal, Button, Form, Input } from 'antd'
import CallApi from '@/util/ajax'

class Mock extends Component {
  constructor() {
    super()
    this.state = {
      curMockIndex: 0,
      curOptionIndex: 0,
      dataList: [{"name":"detail","describe":"detial data","url":"/detail/:id","method":"GET","dataType":"JSON","responseKey":"success","responseOptions":{"success":{"desc":"success response","path":"./detail/success.json","key":"success","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= 'ejs' %> <%= query.xxx %> <%= params.id %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},"fail":{"desc":"fail response","path":"./detail/fail.json","key":"fail","template":"{\n  \"data\": [\n<% _.times(9, String).forEach(function (val, i) {%>\n    {\n      \"content\": \"hello world<%=i%>  <%=number(8)%>\"\n    },\n<% }) %>\n    {\n      \"content\": \"hello world<%=number(8)%>\"\n    }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},"statusCode_500":{"desc":"statusCode 500","statusCode":500,"key":"statusCode_500","template":"500"}},"responseOptionsList":[{"desc":"success response","path":"./detail/success.json","key":"success","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= 'ejs' %> <%= query.xxx %> <%= params.id %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},{"desc":"fail response","path":"./detail/fail.json","key":"fail","template":"{\n  \"data\": [\n<% _.times(9, String).forEach(function (val, i) {%>\n    {\n      \"content\": \"hello world<%=i%>  <%=number(8)%>\"\n    },\n<% }) %>\n    {\n      \"content\": \"hello world<%=number(8)%>\"\n    }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},{"desc":"statusCode 500","statusCode":500,"key":"statusCode_500","template":"500"}]},{"name":"list","describe":"list data","url":"/list","method":"GET","dataType":"JSON","responseKey":"firstKey","responseOptions":{"firstKey":{"desc":"one item","path":"./list/firstData.json","key":"firstKey","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= 'ejs' %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},"SecondKey":{"desc":"ten items","path":"./list/secondData.json","key":"SecondKey","template":"{\n  \"data\": [\n<% _.times(9, String).forEach(function () {%>\n    {\n      \"content\": \"hello world<%=number(8)%>\"\n    },\n<% }) %>\n    {\n      \"content\": \"hello world<%=query.id%>\"\n    }],\n  \"status\": {\n    \"code\": 200\n  }\n}"}},"responseOptionsList":[{"desc":"one item","path":"./list/firstData.json","key":"firstKey","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= 'ejs' %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},{"desc":"ten items","path":"./list/secondData.json","key":"SecondKey","template":"{\n  \"data\": [\n<% _.times(9, String).forEach(function () {%>\n    {\n      \"content\": \"hello world<%=number(8)%>\"\n    },\n<% }) %>\n    {\n      \"content\": \"hello world<%=query.id%>\"\n    }],\n  \"status\": {\n    \"code\": 200\n  }\n}"}]},{"name":"post","describe":"post data","url":"/post","method":"POST","dataType":"JSON","responseKey":"firstKey","responseOptions":{"firstKey":{"desc":"get post query","path":"./post/firstData.json","key":"firstKey","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= JSON.stringify(query).replace(/\\\"/g, '') %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},"secondKey":{"desc":"secondKey","path":"post/secondKey.json","key":"secondKey","template":"{\n  \"data\": \"secondKey\"\n}"}},"responseOptionsList":[{"desc":"get post query","path":"./post/firstData.json","key":"firstKey","template":"{\n  \"data\": [{\n    \"content\": \"hello <%= JSON.stringify(query).replace(/\\\"/g, '') %>\"\n  }],\n  \"status\": {\n    \"code\": 200\n  }\n}"},{"desc":"secondKey","path":"post/secondKey.json","key":"secondKey","template":"{\n  \"data\": \"secondKey\"\n}"}]},{"name":"test","describe":"test","url":"/test","method":"POST","dataType":"json","responseOptions":{"test1":{"desc":"test1","path":"test/test1.json","key":"test1","template":"{\"data\": \"yeah~\"}"}},"responseKey":"test2","responseOptionsList":[{"desc":"test1","path":"test/test1.json","key":"test1","template":"{\"data\": \"yeah~\"}"}]},{"name":"test1","describe":"/test1","url":"/test1","method":"get","dataType":"json","responseOptions":{"one":{"desc":"one","path":"test1/one.json","key":"one","template":"{\n\"one\": \"one\"\n}"}},"responseKey":["one"],"responseOptionsList":[{"desc":"one","path":"test1/one.json","key":"one","template":"{\n\"one\": \"one\"\n}"}]}],
      modal: '',
      mockForm: {
        name: '',
        describe: '',
        url: '',
        method: ''
      }
    }
  }
  // get: vue 中的computed
  get curMock () {
    return this.state.dataList[this.state.curMockIndex]
  }
  get curOption () {
    return this.curMock.responseOptionsList[this.state.curOptionIndex]
  }
  // 生命周期
  componentDidMount () {
  }
  // event: 事件
  addMock = () => {
    console.log(111)
    this.setState({ modal: 'addMock' })
  }
  handleCloseModal = () => {
    this.setState({ modal: '' })
  }
  handleSaveMock = (e) => {
    e.preventDefault()
    console.log(this.props.form)
    return
  }
  handleInput = (e) => {
    console.log(e)
    // const mockForm = Object.assign({}, this.state.mockForm, { [key]: val })
    // this.setState({ mockForm: mockForm })
  }
  // html
  render() {
    // const { getFieldDecorator } = this.props.form
    console.log(this.props)
    return (
      <div className={styles.wrap}>
        <div className={styles.conItem +' '+styles.left}>
          <div className={styles.top} onClick={this.addMock}>
            <button className={styles.addMock}>Add Mock</button>
          </div>
          <div className={styles.itemList}>
            {this.state.dataList.map((mock, index) => {
              return (
                <div title={mock.url}
                  className={styles.mockItem+' '+(this.state.curMockIndex === index && styles.active)}
                  click="switchMock(mock)" key={index}>
                  <div className={styles.name}>{mock.name}</div>
                  <div className={styles.url}>{mock.url}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.conItem +' '+styles.center}>
          <div className={styles.top} click="addOption">
            <button className={styles.addOtion}>Add Option</button>
          </div>
          <div className={styles.itemList}>
            {this.curMock.responseOptionsList.map((option, index) => {
              return (
                <div  title={option.key}
                  className={styles.optionItem+' '+(this.state.curOptionIndex === index && styles.active)}
                  click="switchMockData(curMock, option)" key={index}>
                  <div className={styles.key}>{option.key}</div>
                  <div className={styles.desc}>{option.desc}</div>
                  <div className={styles.path}>{option.path}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.conItem +' '+styles.right}>
          <div className={styles.top} click="addMock">
            <button className={styles.rightBtn +' '+ styles.active}>Option edit</button>
            <button className={styles.rightBtn}>Option template</button>
            <button className={styles.rightBtn}>Response data</button>
            <button className={styles.rightBtn}>Open in browser</button>
          </div>
          <div className={styles.mockDetail}>
            <InputItem name="name">
              <div className={styles.inpuCon +' '+ styles.readonly}><input type="text" value="" readOnly/></div>
            </InputItem>
            <InputItem name="describe">
              <div className={styles.inpuCon}><input type="text" value=""/></div>
            </InputItem>
            <InputItem name="url">
              <div className={styles.inpuCon}><input type="text" value=""/></div>
            </InputItem>
            <InputItem name="methods">
              <div className={styles.inpuCon}><input type="text" value=""/></div>
            </InputItem>
            <InputItem name="dataType">
              <div className={styles.inpuCon}><input type="text" value=""/></div>
            </InputItem>
            <InputItem>
              <div className={styles.saveBtn}>Save</div>
            </InputItem>
          </div>
        </div>
        <Modal title="Add Mock" visible={this.state.modal === 'addMock'} footer={null} onCancel={this.handleCloseModal}>
          <MockForm></MockForm>
        </Modal>
      </div>
      
    );
  }
}

// Form.create()(Mock)

export default Mock;
