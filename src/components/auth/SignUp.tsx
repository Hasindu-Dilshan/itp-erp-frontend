import React from 'react'
import { Button, Card, Checkbox, Form, Input, Radio, Select, TreeSelect, Upload } from 'antd'

import "./SignUp.css";
import image from "../../Assets/Logo.png"
import { PlusOutlined } from '@ant-design/icons';


interface Props {
    stateChanger : ()=>void
}

const SignUp = ({stateChanger}:Props) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div className='container' >
        <img src={image} width={200}/> <br/><br/><br/><br/>
        
        <div className='card'>
        <div className='card2'> 
            <Form
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 22 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
             
                    <Form.Item
                    label={<label style={{ color: "white", fontSize:14 }}>Username</label>}
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label={<label style={{ color: "white", fontSize:14 }}>Email</label>}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white", fontSize:14 }}>Password</label>}
                        name="password"
                        rules={[{ required: true, message: 'Please enter the password!' }]}
                    >
                    <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white", fontSize:14 }}>Confirm Password</label>}
                        name="cnfpassword"
                        rules={[{ required: true, message: 'Please enter the password again to confirm!' }]}
                    >
                    <Input.Password/>
                    </Form.Item>

                    <Form.Item label={<label style={{ color: "white", fontSize:14 }}>Upload</label>} valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
               
            </Form>
            </div>
        </div>
    </div>
    
)
}

export default SignUp