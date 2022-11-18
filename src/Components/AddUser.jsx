import React, { useState } from 'react'
import { Alert, Button, Form, Input, Select} from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import {  CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const {Option} = Select

const layout = {
    labelCol: {
        span:2,
    },
    wrapperCol: {
        span: 10,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};


export default function Adduser(props) {
    const onFinish = async (values) => {
        const {name, email,password, role} = values.user
        userServices.register(name,email,password, role).then(
            (res) => {
                // console.log(res)
                if (res.success) {
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.message)
                }else{
                    // console.log(res)
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.message)
                }
            }
        ).catch(err =>{
            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',err.response.data.message)
        }
        )

    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                        required : true
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="Password"
                rules={[
                    {
                        required : true,
                        type : 'password'
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name={['user', 'role']}
                label = 'Role'
                rules={[
                    {
                        require : true
                    }
                ]}>
                <Select>
                    <Option value='HV'>Hoc vien</Option>
                    <Option value='GV'>Giang vien</Option>
                    <Option value = 'admin'>Admin</Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
