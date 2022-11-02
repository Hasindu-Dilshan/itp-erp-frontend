import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useState } from 'react'
import { EmployeeModel } from '../../models/employee_model'
import numberValidator from '../common/number_validator';
import stringValidator from '../common/validation_helper';


interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   employee?: EmployeeModel
}


const roles: string[] = [
   "Supervisor",
   "Delivery boy",
   "Driver",
   "Marketing executive",
   "Cleaner",
]

const AddUserModal = ({ isOpen, handleCancel, handleOk, employee }: Props) => {
   const [name, setName] = useState<string>("");
   const [nic, setNic] = useState<string>("");
   const [role, setRole] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [contactNumber, setContactNumber] = useState<string>("");
   const [age, setAge] = useState<number>(0);
   const [salary, setSalary] = useState<number>(0);

   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title="Add user"
         footer={null}
      >
         <Form
            layout='vertical'
            autoComplete="false"
         >

            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"employee-name"}
                     label="Employees Name"
                     rules={stringValidator("Enter employee name")}
                  >
                     <Input placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setName(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"employee-nic"}
                     label="Employee NIC"
                     rules={stringValidator("Enter employee nic")}
                  >
                     <Input placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setNic(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"employee-address"}
                     label="Employee Address"
                     rules={stringValidator("Enter employee address")}
                  >
                     <Input.TextArea placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setAddress(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={8}>
                  <Form.Item
                     name={"Role"}
                     label="Role"
                     rules={stringValidator("Enter valid role")}
                  >
                     <Select placeholder="select item"
                        onChange={(val) => {
                           if (val) {
                              setRole(val);

                           }
                        }}
                     >
                        {
                           roles.map((item) => <Select.Option
                              key={item}
                              value={item}
                           >{item}</Select.Option>)
                        }
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={2} style = {{margin : "0 8px"}} >
                  <Form.Item
                     name={"employee-age"}
                     label="Age"
                     rules={numberValidator("Please enter valid age")}
                  >
                     <Input
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setAge(parseInt(val.target.value));

                           }
                        }}
                     />
                  </Form.Item>
               </Col>
               <Col span={4} style = {{margin : "0 8px"}} >
                  <Form.Item
                     name={"employee-SALARY"}
                     label="Salary"
                     rules={numberValidator("Please enter valid salary")}
                  >
                     <Input
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setSalary(parseInt(val.target.value));
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item
                     name={"employee-contactNumber"}
                     label="Contact Number"
                     rules={stringValidator("Please enter valid contact Number")}
                  >
                     <Input
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setContactNumber(val.target.value);

                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>

               </Col>
               <Col span={7} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }}>Create User</Button>
               </Col>
            </Row>
         </Form>

      </Modal>
   )
}

export default AddUserModal