import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { ItemModel } from '../../models/item_model'
import numberValidator from '../common/number_validator'
import stringValidator from '../common/validation_helper'
import LogRocket from 'logrocket';
LogRocket.init('yjover/erp');

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   item?: ItemModel
}


const AddItemModal = ({ isOpen, handleCancel, handleOk, item }: Props) => {
   const [itemName, setItemName] = useState<string>("");
   const [itemPrice, setItemPrice] = useState<number>(0);
   const [itemManufacturer, setItemManufacturer] = useState<string>("");

   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title="Add item"
         footer={null}
      >
         <Form
            layout='vertical'
            autoComplete="false"
         >
            <Row>
               <Col span={10}>
                  <Form.Item
                     label="Item name"
                     name={"item-name"}
                     rules={stringValidator("Please enter item name")}>
                     <Input onChange={(val) => {
                        if (val) {
                           setItemName(val.target.value);
                        }
                     }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={10}>
                  <Form.Item
                     label="Item price"
                     name={"item-price"}
                     rules={numberValidator("Please enter item price")}>
                     <Input onChange={(val) => {
                        if (val) {
                           setItemPrice(parseInt(val.target.value));
                        }
                     }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     label="Item manufacturer"
                     name={"item-manufacturer"}
                     rules={stringValidator("Please enter item manufacturer")}>
                     <Input onChange={(val) => {
                        if (val) {
                           setItemName(val.target.value);
                        }
                     }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={19}/>
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }}>Add Item</Button>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default AddItemModal