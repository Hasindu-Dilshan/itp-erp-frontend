import { Button, Card, Checkbox, Form, Input } from 'antd'
import WrapperCard from '../common/WrapperCard';
import WrapperContainer from '../common/WrapperContainer';
import "./SignIn.css"
import image from "../../Assets/Logo.png"
const Signin = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="WrapperContainer">
            <img src={image} width={200}/> <br/><br/><br/><br/><br/><br/><br/><br/>
            
            <div className='card'>
                
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <WrapperCard >
                        <Form.Item
                            label={<label style={{ color: "white", fontSize:18 }}>Username</label>}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<label style={{ color: "white", fontSize:18 }}>Password</label>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password /><br/><br/>
                        </Form.Item>
                        
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>{<label style={{ color: "white", fontSize:18 }}>Remeber me</label>}</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </WrapperCard>
                </Form>
            </div>
        </div>
    )
}

export default Signin