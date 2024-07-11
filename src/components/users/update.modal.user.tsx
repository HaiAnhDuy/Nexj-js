import { Button, Modal, Divider, notification } from 'antd';
import { Input } from 'antd';
import { useEffect, useState } from 'react'
import { Iitems } from './user.table';
interface Iprops {
    open_update_table: boolean,
    set_open_update_table: (v: boolean) => void
    data_want_to_edit: null | Iitems | any
    set_data_want_to_edit: any
    access_token: string
    GetData1: () => void,



}
const UpdateModalUser = (props: Iprops) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [age, setage] = useState('')
    const [gender, setgender] = useState('')
    const [address, setaddress] = useState('')
    const [role, setrole] = useState('')

    useEffect(() => {
        if (props.data_want_to_edit) {
            setname(props.data_want_to_edit.name);
            setemail(props.data_want_to_edit.email)
            setpassword(props.data_want_to_edit.password)
            setgender(props.data_want_to_edit.gender)
            setage(props.data_want_to_edit.age)
            setrole(props.data_want_to_edit.role)
            setaddress(props.data_want_to_edit.address)
        }

    }, [props.data_want_to_edit])
    const handleCancel = () => {
        props.set_open_update_table(false);
        props.set_data_want_to_edit(null)
    };

    const handleOk = async () => {
        console.log(name, email, age)
        if (props.data_want_to_edit) {
            const res = await fetch("http://localhost:8000/api/v1/users", {
                method: 'PATCH',
                body: JSON.stringify({
                    _id: props.data_want_to_edit._id,
                    name: name,
                    email: email,
                    age: age,
                    gender: gender,
                    address: address,
                    role: role
                },
                ),
                headers: {
                    'Authorization': `Bearer ${props.access_token}`,
                    "Content-Type": "application/json"
                }

            })
            const check = await res.json();
            if (check.data) {
                notification.success({
                    message: 'Sửa người dùng thành công',
                    description: JSON.stringify(check.message)
                })
                await props.GetData1();
                props.set_open_update_table(false);

            } else {

                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: JSON.stringify(check.message)
                })
            }
            console.log('check', check)

        }
    }

    return (
        <>
            <Modal title="Basic Modal" open={props.open_update_table} onOk={handleOk} onCancel={handleCancel} className='modal' >

                <div>
                    <label >Name:</label>
                    <Input className='modal-input' value={name} placeholder="Name" onChange={(event) => { setname(event.target.value) }} />

                </div>
                <div>
                    <label >Email:</label>
                    <Input className='modal-input' value={email} placeholder="Email" onChange={(event) => { setemail(event.target.value) }} />

                </div>
                <div>
                    <label >Password:</label>
                    <Input className='modal-input' value={`Can't Show`} placeholder="Password" disabled />

                </div>
                <div>
                    <label >Age:</label>
                    <Input className='modal-input' value={age} placeholder="Age" onChange={(event) => { setage(event.target.value) }} />

                </div>
                <div>
                    <label >Gender:</label>
                    <Input className='modal-input' value={gender} disabled placeholder="Gender" onChange={(event) => { setgender(event.target.value) }} />

                </div>
                <div>
                    <label >Address:</label>
                    <Input className='modal-input' value={address} placeholder="Address" onChange={(event) => { setaddress(event.target.value) }} />

                </div>
                <div>
                    <label >Role:</label>
                    <Input className='modal-input' value={role} placeholder="Role" onChange={(event) => { setrole(event.target.value) }} />

                </div>



            </Modal>
        </>
    )
}

export default UpdateModalUser