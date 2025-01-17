import { Interface } from 'readline'
import '../../style/userpage.scss';
import CreateModalUser from './create.modal.user';
import UpdateModalUser from './update.modal.user';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Button, Modal, Divider, notification } from 'antd';
import { Input } from 'antd';
import DeleteModalUser from './delete.modal.user';




import { useEffect, useState } from 'react'
export interface Iitems {
    name: string,
    _id: string,
    address: string,
    age: string,
    email: string,
    gender: string,
    role: string
}
const UserTable = () => {
    const [DataTest1, SetData1] = useState([]);
    const [loading_table, set_loading_table] = useState(false)
    const [open_update_table, set_open_update_table] = useState(false)
    const [data_want_to_edit, set_data_want_to_edit] = useState({})
    const [open_modal_delete, set_modal_delete] = useState(false)
    const [get_id_delete, set_id_delete] = useState({})

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    const access_token = localStorage.getItem('access_token') as string
    const GetData1 = async () => {
        set_loading_table(true)


        // console.log(data.data.access_token)

        const res1 = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {

            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }

        });

        const data1 = await res1.json()
        console.log('>>> check', data1.data.result, data1)
        if (data1 && data1.data && data1.data.meta) {
            setMeta({
                current: data1.data.meta.current,
                pageSize: data1.data.meta.pageSize,
                pages: data1.data.meta.pages,
                total: data1.data.meta.total
            })
        }
        if (data1 && data1.data && data1.data.result && data1.data.result.length > 0) {
            SetData1(data1.data.result)
            set_loading_table(false)
        }



    }

    useEffect(() => {
        // update
        GetData1();
    }, [meta.current])
    const function_handle_edit = (record: any) => {

        set_open_update_table(true);
        set_data_want_to_edit(record)
        console.log(record)
    }
    const function_handle_delete = async (data: any) => {
        set_modal_delete(true)
        set_id_delete(data)
        // set_loading_table(true)
        // const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         username: 'admin@gmail.com',
        //         password: '123456'
        //     },
        //     ),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }

        // });

        // const data = await res.json();
        // if (data && data.data && data.data.access_token) {
        //     const res_delete = await fetch('http://localhost:8000/api/v1/users/' + id,
        //         {
        //             method: 'DELETE',
        //             headers: {
        //                 'Authorization': `Bearer ${data.data.access_token}`,
        //                 "Content-Type": "application/json"
        //             }

        //         }
        //     )
        //     const delete_data = await res_delete.json();

        //     console.log('delete_data', delete_data)
        //     if (delete_data && delete_data.data) {
        //         GetData1();
        //         set_loading_table(false)

        //     }
        // }


    }
    const HandleonChange = async (page: number, pageSize: number) => {
        console.log(page, pageSize);
        setMeta({
            current: page,
            pageSize: pageSize,
            pages: meta.pages,
            total: meta.total
        })
    }

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
                    <Button onClick={() => function_handle_edit(record)}> <a>Update</a></Button>
                    <Button danger onClick={() => function_handle_delete(record)}><a>Delete</a>
                    </Button>
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
                loading={loading_table}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    onChange: HandleonChange
                }}
            />

        )
    }




    return (

        <div className='btn-open-modal'>
            <CreateModalUser
                GetData1={GetData1}
                access_token={access_token}
                set_loading_table={set_loading_table}

            />
            <UpdateModalUser
                open_update_table={open_update_table}
                set_open_update_table={set_open_update_table}
                data_want_to_edit={data_want_to_edit}
                set_data_want_to_edit={set_data_want_to_edit}
                access_token={access_token}
                GetData1={GetData1}


            />
            <DeleteModalUser
                open_modal_delete={open_modal_delete}
                set_modal_delete={set_modal_delete}
                get_id_delete={get_id_delete}
                GetData1={GetData1}
            />
            <TableUser />

        </div>
    )
}
export default UserTable