import { Button, Modal, Divider, notification } from 'antd';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Checkbox, Form, Select, InputNumber } from 'antd';
interface Iprops {
    GetData1: () => void,
    access_token: string,
    set_loading_table: (v: boolean) => void
}


const CreateModalUser = (props: Iprops) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };


    const { Option } = Select;

    const [form] = Form.useForm();





    const onFinish: FormProps['onFinish'] = async (values) => {
        console.log('Success:', values);

        props.set_loading_table(true)
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: 'POST',
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
                age: values.age,
                gender: values.gender,
                address: values.address,
                role: values.role
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
            props.set_loading_table(false);
            values = ''


        } else {
            props.set_loading_table(false)

            notification.error({
                message: 'Có lỗi xảy ra',
                description: JSON.stringify(test.message)
            })
        }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const handleOk = async () => {
    //     props.set_loading_table(true)
    //     const res = await fetch("http://localhost:8000/api/v1/users", {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: name,
    //             email: email,
    //             password: password,
    //             age: age,
    //             gender: gender,
    //             address: address,
    //             role: role
    //         },
    //         ),
    //         headers: {
    //             'Authorization': `Bearer ${props.access_token}`,
    //             "Content-Type": "application/json"
    //         }

    //     });
    //     const test = await res.json();
    //     console.log('test', test)
    //     if (test.data) {
    //         await props.GetData1();
    //         notification.success({
    //             message: 'Thêm mới người dùng thành công',
    //             description: JSON.stringify(test.message)
    //         })
    //         HandleToEmpty()
    //         setIsModalOpen(false);
    //         props.set_loading_table(false)


    //     } else {
    //         props.set_loading_table(false)

    //         notification.error({
    //             message: 'Có lỗi xảy ra',
    //             description: JSON.stringify(test.message)
    //         })
    //     }




    //     // console.log(name, email, password, age, gender, address, role)


    // };

    const HandleToEmpty = () => {

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} className='btn'>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel} className='modal' >
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
                <Form
                    name="basic"
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* age */}
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    {/* gender */}

                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                    {/* address */}
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* role */}

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="USER">USER</Option>
                            <Option value="ADMIN">ADMIN</Option>
                        </Select>
                    </Form.Item>



                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>




                </Form>


            </Modal>


        </>
    )
}

export default CreateModalUser