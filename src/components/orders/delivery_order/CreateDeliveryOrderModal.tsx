import { MouseEvent, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Dropdown, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

interface Props {
   shouldOpen: boolean,
   confirmLoading: boolean,
   handleOk: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void)
}

const CreateDeliveryOrderModal = ({ shouldOpen, handleOk, handleCancel, confirmLoading }: Props) => {
   const [transactionType, setTransactionType] = useState("");

   const menu = (
      <Menu
         items={[
            {
               label: (
                  <p onClick={() => setTransactionType("Card")}>Credit/Debit Card</p>
               ),
               key: '0',
            },
            {
               label: (
                  <p onClick={() => setTransactionType("Cash On Delivery")}>Cash On Delivery</p>
               ),
               key: '1',
            },

         ]}
      />
   );
   return (
      <Modal
         title="Create Delivery Order"
         open={shouldOpen}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         width={1000}
      >
         <Form>
            <Row>
               <Col span={8}>
                  <Form.Item
                     name="transaction-date"
                     label="Transaction Date"
                  >
                     <DatePicker />
                  </Form.Item>
               </Col>
               <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Item
                     name="delivery-date"
                     label="Delivery Date"
                  >
                     <DatePicker />
                  </Form.Item>
               </Col>
               <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Item
                     name="transaction-type"
                     label="Transaction Type"
                  >
                     <Dropdown overlay={menu}>
                        <div onClick={e => e.preventDefault()}>
                           {transactionType === "" ? <DownOutlined /> : transactionType}
                        </div>
                     </Dropdown>
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                  <Form.Item
                     name="name"
                     label="Customers Name"
                  >
                     <Input placeholder="Enter here"  />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item
                     name="address"
                     label="Address"
                  >
                     <TextArea placeholder='Enter Here' rows={6} />
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default CreateDeliveryOrderModal