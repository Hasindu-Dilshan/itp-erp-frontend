import { Form, Modal, Row, Button, DatePicker, Input, Select, Col } from 'antd'
import React, { useState } from 'react'
import { ItemModel } from '../../../models/item_model'
import { SalesOderModel } from '../../../models/sales_order_model'
import numberValidator from '../../common/number_validator'
import stringValidator from '../../common/validation_helper'


interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   order?: SalesOderModel
}

const items: ItemModel[] = [
   {
      _id: "1",
      name: "Casset",
      price: 150,
      status: true,
      manufacturer: "Abans"
   },
   {
      _id: "3",
      name: "Radio",
      price: 150,
      status: true,
      manufacturer: "Abans"
   },
   {
      _id: "2",
      name: "Tv",
      price: 150,
      status: true,
      manufacturer: "Abans"
   },
]

const AddSalesOrderModal = ({ isOpen, handleCancel, handleOk,order }: Props) => {

   const [date, setDate] = useState<string>("");
   const [transactionDate, setTransactionDate] = useState<string>("");
   const [customerName, setCustomerName] = useState<string>("");
   const [address, setShippingAddress] = useState<string>("");
   const [itemName, setItemName] = useState<string>("");
   const [quantity, setQuantity] = useState<number>(0);
   const [totalBill, setTotalBill] = useState<number>(0);
   const [selectedItem, setSelectedItem] = useState<ItemModel>();


   const createOrder = () => {
      const order: SalesOderModel = {
         date: date,
         transactionDate : transactionDate,
         transactionType : "tra",
         coustomer: customerName,
         shippingAddress :address,
         totalBill,
         status: 0,
         companyId: "1",
         itemId: selectedItem!._id,
         itemName: itemName,
      }
      
   }


   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title="Add sales order"
         footer={null}
      >
         <Form
            layout='vertical'
            autoComplete="false"
         >
            <Row>
               <Col span={10}>
                  <Form.Item
                     name={"order-date"}
                     label="Date"
                  //   rules={stringValidator("Pick an item name")}
                  >
                     <DatePicker
                        onChange={(val) => {
                           if (val) {
                              var month: number = val.month() + 1;
                              var day: number = val.date();
                              var year: number = val.year();
                              setDate(`${year}-${month}-${day}`)
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={10}>
                  <Form.Item
                     name={"transaction-date"}
                     label="Transaction Date"
                  //        rules={stringValidator("Pick an item name")}
                  >
                     <DatePicker
                        onChange={(val) => {
                           if (val) {
                              var month: number = val.month() + 1;
                              var day: number = val.date();
                              var year: number = val.year();
                              setTransactionDate(`${year}-${month}-${day}`)
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"customer-name"}
                     label="Customers Name"
                     rules={stringValidator("Enter customer name")}
                  >
                     <Input placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setCustomerName(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"customer-address"}
                     label="Shipping Address"
                     rules={stringValidator("Enter customer address")}
                  >
                     <Input.TextArea placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setShippingAddress(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={10}>
                  <Form.Item
                     name={"item-name"}
                     label="Item Name"
                     rules={stringValidator("Pick an item name")}
                  >
                     <Select placeholder="select item"
                        onChange={(val) => {
                           if (val) {
                              setItemName(val);
                              items.forEach(item => {
                                 if (item.name === val) {
                                    setSelectedItem(item)
                                 }
                              });
                           }
                        }}
                     >
                        {
                           items.map((item) => <Select.Option
                              key={item._id}
                              value={item.name}
                           >{item.name}</Select.Option>)
                        }
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={10}>
                  <Form.Item
                     name={"item-datequantity"}
                     label="Item Quantity"
                     rules={numberValidator("Please enter valid quantity")}
                  >
                     <Input
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setQuantity(parseInt("" + val.target.value));
                              if (selectedItem && quantity !== 0) {
                                 console.log(quantity)
                                 setTotalBill(selectedItem.price * quantity);
                              }
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
                  <h3>Total Bill : {totalBill}</h3>
               </Col>
               <Col span={7} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }}>Create Order</Button>
               </Col>
            </Row>
         </Form>

      </Modal>
   )
}

export default AddSalesOrderModal