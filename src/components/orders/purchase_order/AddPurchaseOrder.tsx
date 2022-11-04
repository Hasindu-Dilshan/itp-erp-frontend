import { MouseEvent, useEffect, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Input, Button, Table, Dropdown, Menu, Space, } from 'antd';
import { DeliveryOrderModel } from "../../../models/delivery_order_model"
import stringValidator from "../../common/validation_helper"
import DeliveryOrderService from '../../../services/delivery_order_service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table'
import { ItemModel } from '../../purchase_request/item_model';
import { DownOutlined } from '@ant-design/icons';
import { PhurchaseOrderModel } from '../../../models/purchase_order';
interface Props {
   shouldOpen: boolean,
   handleOk: () => void,
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   order?: PhurchaseOrderModel
}

const columns: ColumnsType<ItemModel> = [
   // {
   //    title: "Item ID",
   //    dataIndex: "id",
   //    key: "id",
   // },
   {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
   },
   {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
   },
   {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
   },


]
const AddPurchaseOrder = ({ shouldOpen, handleOk, handleCancel, order }: Props) => {
   const [transactionDate, setTransactionDate] = useState("2022-10-12");
   const [deliveryDate, setDeliveryDate] = useState("2022-10-15");
   const [customersName, setCustomersName] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [isOpen, setIsOpen] = useState(false)
   const [selectedItems, setSelectedItems] = useState<ItemModel[]>([])
   const [selectedIemName, setSelectedItemName] = useState("")
   const [selectedIemQuantity, setSelectedItemQuantity] = useState("")
   const [selectedItemUnitPrice, setSelectedItemUnitPrice] = useState("")
   const [totalBill, setTotalBill] = useState<number>(0)

   const createDeliveryOrder = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {


      const order: DeliveryOrderModel = ({
         date: new Date(deliveryDate),
         transactionDate: new Date(transactionDate),
         transactionType: "asd",
         coustomer: customersName,
         shippingAddress: address,
         companyId: "1",
         totalBill: totalBill,
         status: 0,
      });

      DeliveryOrderService.createDeliveryItem(order).then((val) => {


      }).catch(err=>console.log(`create delivery order failed ${err}`));



      handleOk();
   }


   const addItem = () => {
      const item: ItemModel = {
         name: selectedIemName,
         unitPrice: parseFloat(selectedItemUnitPrice),
         quantity: parseFloat(selectedIemQuantity),
      }
      let i: ItemModel[] = selectedItems;
      i.push(item)

      let tot: number = totalBill + (item.quantity * item.unitPrice);
      setTotalBill(tot)
      setSelectedItems([...i])
      openCloseAddItemModal();

   }

   const openCloseAddItemModal = () => {
      setIsOpen(!isOpen)
   }
   const menu = (
      <Menu
         items={[
            {
               key: 'Refreregirator',
               label: "Refreregirator",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
            {
               key: 'Television',
               label: "Television",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
            {
               key: 'Washing Machine',
               label: "Washing Machine",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
         ]}
      />
   );

   useEffect(() => {
      if (order) {
         // console.log("called");
         // setTransactionDate(order.transactionDate.toLocaleDateString());
         // setDeliveryDate(order.date.toLocaleDateString());
         // setTotalBill(order.totalBill);
         // setCustomersName(order.coustomer);
         // setAddress(order.shippingAddress);


      }
   }, [selectedItems, order])

   return (
      <Modal
         title="Create Delivery Order"
         open={shouldOpen}
         onOk={createDeliveryOrder}
         onCancel={handleCancel}
         width={1000}
         footer={null}
      >
         <Form
            layout="vertical"

         >
            <Row>
               <Col span={12}>
                  <Form.Item
                     name="transaction-date"
                     label="Transaction Date"
                    
                  >
                     <DatePicker onChange={(val) => {
                        if (val) {
                           var month: number = val.month() + 1;
                           var day: number = val.date();
                           var year: number = val.year();

                           setTransactionDate(`${year}-${month}-${day}`)
                        }
                     }} />
                  </Form.Item>
               </Col>
               <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Item
                     name="delivery-date"
                     label="Delivery Date"
                    
                  >
                     <DatePicker
                        onChange={(val) => {
                           if (val) {
                              var month: number = val.month() + 1;
                              var day: number = val.date();
                              var year: number = val.year();

                              setDeliveryDate(`${year}-${month}-${day}`)

                           }
                        }}
                     />
                  </Form.Item>
               </Col>

            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="name"
                     label="Customers Name"
                     rules={stringValidator("Customer Name is required")}
                  >
                     <Input onChange={(val) => { setCustomersName(val.target.value) }} value="{customersName}" />
                  </Form.Item>
               </Col>

            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="address"
                     label="Address"
                     rules={stringValidator("Customer Address is required")}
                  >
                     <Input.TextArea value={address} rows={3} onChange={(val) => { setAddress(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>
            <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />

            <Table columns={columns} className="table" dataSource={selectedItems} />
            <h1> Total Bill : {totalBill}</h1>
            <Row>
               <Col span={19} />
               <Col span={4}>
                  <Button type='primary' htmlType='submit' onClick={createDeliveryOrder} style={{ width: "100%" }}>Create Order</Button>
               </Col>
            </Row>
         </Form>


         <Modal title="Add Item" open={isOpen} onOk={() => addItem()} onCancel={() => { openCloseAddItemModal() }}>
            <Form>
               <Row>
                  <Col span={8}><Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                     <Button>
                        <Space>
                           Item Name
                           <DownOutlined />
                        </Space>
                     </Button>
                  </Dropdown>
                  </Col>
                  <Col span={8}>
                     <Input placeholder="Quantity" onChange={(val) => { setSelectedItemQuantity(val.target.value) }} />
                  </Col>
                  <Col span={8} style={{ padding: "0px 8px" }}>
                     <Input placeholder="Unit Price" onChange={(val) => { setSelectedItemUnitPrice(val.target.value) }} />
                  </Col>

               </Row>

            </Form>
         </Modal>
      </Modal>
   )
}

export default AddPurchaseOrder