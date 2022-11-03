import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { ItemModel } from '../../models/item_model'
import ItemService from '../../services/item_service'
import numberValidator from '../common/number_validator'
import stringValidator from '../common/validation_helper'

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
   const [supplier, setSupplier] = useState<string>("");
   const createItem = async () => {
      const item: ItemModel = {
         name: itemName,
         price: itemPrice,
         manufacturedBy: itemManufacturer,
         inStock: true,
         supplier: supplier,
         companyId: "1",
      }
      await ItemService.createDeliveryItem(item)
         .catch(err => console.log(`create item failed ${err}`))
handleOk();
   }


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
               <Col span={11}>
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
               <Col span={11}>
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
               <Col span={11}>
                  <Form.Item
                     label="Item manufacturer"
                     name={"item-manufacturer"}
                     rules={stringValidator("Please enter item manufacturer")}>
                     <Input onChange={(val) => {
                        if (val) {
                           setItemManufacturer(val.target.value);
                        }
                     }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={11}>
                  <Form.Item
                     label="Item Supplier"
                     name={"item-supplier"}
                     rules={stringValidator("Please enter item supplier")}>
                     <Input
                        onChange={(val) => {
                           if (val) {
                              setSupplier(val.target.value);
                           }
                        }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={19} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }} onClick={createItem}>Add Item</Button>
               </Col>
            </Row>
         </Form>
      </Modal >
   )
}

export default AddItemModal