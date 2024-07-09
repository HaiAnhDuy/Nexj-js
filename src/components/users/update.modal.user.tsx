import { Button, Modal, Divider, notification } from 'antd';
import { Input } from 'antd';
import { useEffect, useState } from 'react'

interface Iprops {
    open_update_table: boolean,
    set_open_update_table: (v: boolean) => void
}
const UpdateModalUser = (props: Iprops) => {
    const handleCancel = () => {
        props.set_open_update_table(false);
    };

    const handleOk = () => {
        console.log('hi !')
    }

    return (
        <>
            <Modal title="Basic Modal" open={props.open_update_table} onOk={handleOk} onCancel={handleCancel} className='modal' >
                <div>
                    HELLO UPDATE MODAL
                </div>
                {/* <div>
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

                </div> */}



            </Modal>
        </>
    )
}

export default UpdateModalUser