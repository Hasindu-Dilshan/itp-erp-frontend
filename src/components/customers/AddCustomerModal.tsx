import { Button, Col, Form, Input, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { CustomeModel } from '../../models/customer_model'
import stringValidator from '../common/validation_helper'

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   customer?: CustomeModel
}



const AddCustomerModal = ({ isOpen, handleCancel, handleOk, customer }: Props) => {
   const [name, setName] = useState("")
   const [nic, setNic] = useState("")
   const [mobile, setMobile] = useState("")
   const [email, setEmail] = useState("")
   const [address, setAddress] = useState("")

   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title="Add Customer"
         footer={null}

      >
         <Form
            layout='vertical'
            autoComplete="false"
         >
            <Row>
               <Col span={24}>
                  <FormItem
                     label="Name"
                     name="customer-name"
                     rules={stringValidator("Please enter a valid name")}>
                     <Input
                        onChange={(val) => {
                           if (val) {
                              setName(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
            </Row>
            <Row>
               <Col span={6}>
                  <FormItem
                     label="Nic"
                     name="customer-nic"
                     rules={stringValidator("Please enter a valid nic")}>
                     <Input
                        onChange={(val) => {
                           if (val) {
                              setNic(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
               <Col span={2} />
               <Col span={6}>
                  <FormItem
                     label="Mobile"
                     name="customer-mobile"
                     rules={stringValidator("Please enter a valid mobile number")}>
                     <Input
                        onChange={(val) => {
                           if (val) {
                              setMobile(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
               <Col span={2} />
               <Col span={6}>
                  <FormItem
                     label="Email"
                     name="customer-email"
                     rules={stringValidator("Please enter a valid email")}>
                     <Input
                        onChange={(val) => {
                           if (val) {
                              setEmail(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     label="Address"
                     name="customer-address"
                     rules={stringValidator("Please enter a valid address")}
                  >
                     <Input.TextArea
                        onChange={(val) => {
                           if (val) {
                              setAddress(val.target.value);
                           }
                        }}
                     >
                     </Input.TextArea>
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
               </Col>
               <Col span={7} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }}>Add Customer</Button>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default AddCustomerModal