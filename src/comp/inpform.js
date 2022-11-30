import React from 'react';
import '../App.css';
import {getData} from './table'
import { Button,Select, Form, Input ,DatePicker} from 'antd';
const {Option} = Select;

let ttoday = new Date().toISOString().slice(0, 10);
console.log(ttoday);
const InpForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => { //sending data to table module

    getData(values);
    document.getElementById('form').style.display = "none";
    document.getElementById('add-todo').style.display = "block";
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onCancel = () => {
    form.resetFields();
    document.getElementById('form').style.display = "none";
    document.getElementById('add-todo').style.display = "block";
  }
  const addtodo = () => {
    document.getElementById('form').style.display = "flex";
    document.getElementById('add-todo').style.display = "none";

  }
  return (
    <>
    <Button  id='add-todo' type="primary" onClick={addtodo}>✚ Add New Todo</Button>
    
    
    <Form id="form" form={form}
      name="TO-DO Form"
      initialValues={{
        status: "Open",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
      
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title',
          },
        ]}
      >
        <Input id='title' allowClear showCount maxLength={100}/>
      </Form.Item>

      <Form.Item
      
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input description',
          },
        ]}
      >
        <Input id='dec' allowClear showCount maxLength={1000}/>
      </Form.Item>
      <Form.Item
      
        label="DueDate"
        name="duedate"
        
      >
        <Input type="date" id='dd' min={ttoday}/>
      </Form.Item>
        
      <Form.Item
      
        label="Tags"
        name="tags"
        
      >
        <Select allowClear mode="tags" id='tags' placeholder="Enter Tags" style={{
            minWidth: '200px',
            marginRight: '20px'
        }} />
            
    
      </Form.Item>
      <Form.Item
       
       label="Status" name="status"
      rules={[
        {
          required: true,
        },
      ]}
      >
      <Select id="stats" style={{
        minWidth:"100px"
      }} >
        <Option value="Open">Open</Option>
        <Option value="Working">Working</Option>
        <Option value="Done">Done</Option>
        <Option value="Over Due">Over Due</Option>
        </Select>
      </Form.Item>
      <div id="btns">
      <Form.Item
       >
        <Button id='add' type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
      <Form.Item 
      >
        <Button id='cancel' danger onClick={onCancel} >
          Cancel
        </Button>
      </Form.Item>
      </div>
    </Form>

    </>
  );
};
export default InpForm;
