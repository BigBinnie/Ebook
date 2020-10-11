import React from 'react';
import {
    Form,
    Input,
    Button,
    Icon,
} from 'antd';
import 'antd/dist/antd.css';
import '../css/register.css';
import * as userService from "../services/userService";
import {getUser} from "../services/userService";
import {checkUserName} from "../services/userService";

class RegisterForm extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userService.register(values);
            }
        });
    };

    handleValidator = (rule, val, callback) => {
        let validateResult = (!val||this.props.form.getFieldValue('password') === val);
        if (!validateResult) {
            callback('Password is unmatched');
        }
        callback();
    }
    handleUserName = (rule, val, callback) => {
        let validateResult = false;
        let name=this.props.form.getFieldValue('username');
        checkUserName(name, (data) => {
            validateResult=data;console.log(data);
            if (!validateResult) {
            callback('User name has already existed');
        }
            else  callback();
        });
        console.log(validateResult);
    }

        render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form" >
                <Form.Item name="User Name"  label="Username" hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' },
                            {
                                validator: this.handleUserName
                            }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            width='20px'
                        />,
                    )}
                </Form.Item>
                <Form.Item name="nickname"  label="Nickname" hasFeedback>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nickname"
                            width='20px'
                        />,
                    )}
                </Form.Item>
                <Form.Item name="password" label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback>
                    {getFieldDecorator('password2', {
                        rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },{
                                validator: this.handleValidator
                            }
                        ]
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="confirm password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item name="E-mail"  label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-mail"
                            width='20px'
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                    <a href="/login">Login now!</a>
                </Form.Item>
            </Form>
        );
    }

}
const WrappedRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);

export default WrappedRegisterForm
