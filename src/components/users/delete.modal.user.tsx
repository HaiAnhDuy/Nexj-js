import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';

interface Iprops {
    open_modal_delete: boolean
    set_modal_delete: (v: boolean) => void
    get_id_delete: any
    GetData1: () => void
}
const DeleteModalUser = (props: Iprops) => {
    const [get_id_delete, set_id_delete] = useState('')

    useEffect(() => {
        set_id_delete(props.get_id_delete._id)
    }, [props.get_id_delete._id])
    const handleOk = async () => {
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
        if (data && data.data && data.data.access_token) {
            const res_delete = await fetch('http://localhost:8000/api/v1/users/' + get_id_delete,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${data.data.access_token}`,
                        "Content-Type": "application/json"
                    }

                }
            )
            const delete_data = await res_delete.json();

            console.log('delete_data', delete_data)
            if (delete_data && delete_data.data) {
                props.GetData1();
                props.set_modal_delete(false);


            }
        }
    };

    const handleCancel = () => {
        props.set_modal_delete(false);
    };
    return (
        <>
            <Modal title="Thông báo" open={props.open_modal_delete} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn xoá người dùng {props.get_id_delete.email} ?</p>

            </Modal>
        </>
    )
}
export default DeleteModalUser