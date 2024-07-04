import { Interface } from 'readline'
// import '../../style/userpage.scss';

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';


import { useEffect, useState } from 'react'
const UserTable = () => {
    const [DataTest1, SetData1] = useState([])
    interface Iitems {
        _id: string,
        address: string,
        age: number,
        email: string
    }

    const GetData1 = async () => {
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: 'POST',
            body: JSON.stringify({
                username: 'admin@gmail.com',
                password: '123456'
            },
            ),
            headers: {
                "Content-Type": "application/json"
            }

        });

        const data = await res.json();
        // console.log(data.data.access_token)
        if (data && data.data && data.data.access_token) {
            const res1 = await fetch("http://localhost:8000/api/v1/users/all", {

                headers: {
                    'Authorization': `Bearer ${data.data.access_token}`,
                    "Content-Type": "application/json"
                }

            });
            console.log(data.data.access_token)
            const data1 = await res1.json();

            console.log('>>> check', data1.data.result)
            if (data1 && data1.data && data1.data.result && data1.data.result.length > 0) {
                SetData1(data1.data.result)
            }

        }

    }

    useEffect(() => {
        // update
        GetData1();
    }, [])


    const columns: TableProps<Iitems>['columns'] = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },


        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.email}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const TableUser = () => {
        return (
            <Table
                columns={columns}
                dataSource={DataTest1}
                rowKey={'_id'}
            />

        )
    }

    return (

        <div>
            <TableUser />
        </div>
    )
}
export default UserTable