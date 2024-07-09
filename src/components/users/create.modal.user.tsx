import { Button, Modal, Divider, notification } from 'antd';
import { Input } from 'antd';
import { useEffect, useState } from 'react'
interface Iprops {
    GetData1: () => void,
    access_token: string,
    set_loading_table: (v: boolean) => void
}
const CreateModalUser = (props: Iprops) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setname] = useState('')
    const [email, setemail] = useState('')

    const [password, setpassword] = useState('')
    const [age, setage] = useState('')
    const [gender, setgender] = useState('')
    const [address, setaddress] = useState('')
    const [role, setrole] = useState('')

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        props.set_loading_table(true)
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
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

        });
        const test = await res.json();
        console.log('test', test)
        if (test.data) {
            await props.GetData1();
            notification.success({
                message: 'Thêm mới người dùng thành công',
                description: JSON.stringify(test.message)
            })
            HandleToEmpty()
            setIsModalOpen(false);
            props.set_loading_table(false)


        } else {
            props.set_loading_table(false)

            notification.error({
                message: 'Có lỗi xảy ra',
                description: JSON.stringify(test.message)
            })
        }




        // console.log(name, email, password, age, gender, address, role)


    };

    const HandleToEmpty = () => {
        setname('');
        setemail('')
        setpassword('')
        setgender('')
        setage('')
        setrole('')
        setaddress('')
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} className='btn'>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='modal' >
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
                    <Input className='modal-input' value={password} placeholder="Password" onChange={(event) => { setpassword(event.target.value) }} />

                </div>
                <div>
                    <label >Age:</label>
                    <Input className='modal-input' value={age} placeholder="Age" onChange={(event) => { setage(event.target.value) }} />

                </div>
                <div>
                    <label >Gender:</label>
                    <Input className='modal-input' value={gender} placeholder="Gender" onChange={(event) => { setgender(event.target.value) }} />

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

export default CreateModalUser