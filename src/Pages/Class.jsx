import { Button, Input, Layout, Menu, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classServices from '../services/classServices';
import openNotification from '../hooks/openNotification';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const Class = (props) => {
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const [classInfo, setclassInfo] = useState()
    const [listStudent, setlistStudent] = useState([])
    const [listAll, setlistAll] = useState([])
    useEffect(() => {
        classServices.getClass(token,id)
        .then(
            (res) => {
                if (res.success) {
                    setclassInfo(res.findClass)
                    setlistStudent(res.findClass.student)
                    setlistAll(res.findClass.student)
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.message)

                }else{
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.message)
                }
            }
        ).catch(err =>{
            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!','Loi he thong')
        }
        )
    }, [token,id])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title : 'Action',
            render : () => <Button type='link'>Delete</Button>
        }
    ]
    const handleFilter = (value) => {
        if (value.length === 0) {
            setlistStudent(listAll)
        }else{
            const list = listAll.filter(
                item => item.name.toLowerCase().includes(value)
            )
            setlistStudent(list)
        }
        
    }
    const columnsStudent = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title : 'Action',
            render : () => <Button type='primary'>Add to class</Button>
        }
    ]
    return(
    <Layout>
        <Header
            style={{
                position: 'fixed',
                zIndex: 1,
                width: '100%',
            }}
        >
            <div className="class-logo" >{classInfo?.name} - {classInfo?.code}</div>
        </Header>
        <div className='class-custom-layout1'>
        <Content
            className="site-layout"
            style={{
                padding: '0 50px',
                marginTop: 64,
            }}
        >
            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 600,
                }}
            >
                
                <Typography.Text strong italic>Hoc sinh trong lop</Typography.Text>
                <Input placeholder='Nhap ten hoc sinh de tim kiem' onChange={(e)=> handleFilter(e.target.value)}/>
                <Table dataSource={listStudent} columns={columns} rowKey={(record) => record._id}/>
            </div>
        </Content>
        <Content
            className="site-layout"
            style={{
                padding: '0 50px',
                marginTop: 64,
            }}
        >
            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 600,
                }}
            >
                <Table dataSource={classInfo?.findClass?.student} columns={columnsStudent} rowKey={(record) => record._id}/>
            </div>
        </Content>
        </div>
        
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            KMIN Academy
        </Footer>
    </Layout>
);
        }
export default Class;
