import { MouseEvent, useEffect, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Input, Button, Table, Dropdown, Menu, Space, } from 'antd';
import { DeliveryOrderModel } from "../../../models/delivery_order_model"
import TextArea from 'antd/lib/input/TextArea';
import DeliveryOrderService from '../../../services/delivery_order/delivery_order_service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table'
import { ItemModel } from '../../purchase_request/item_model';
import { DownOutlined } from '@ant-design/icons';
interface Props {
   shouldOpen: boolean,
   confirmLoading: boolean,
   handleOk: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   deliveryOrder?: DeliveryOrderModel
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





const CreateDeliveryOrderModal = ({ shouldOpen, handleOk, handleCancel, confirmLoading, deliveryOrder }: Props) => {
   const [transactionDate, setTransactionDate] = useState("2022-10-12");
   const [deliveryDate, setDeliveryDate] = useState("2022-10-15");
   const [customersName, setCustomersName] = useState("");
   const [address, setAddress] = useState("");
   const [isOpen, setIsOpen] = useState(false)
   const [selectedItems, setSelectedItems] = useState<ItemModel[]>([])
   const [selectedIemName, setSelectedItemName] = useState("")
   const [selectedIemQuantity, setSelectedItemQuantity] = useState("")
   const [selectedItemUnitPrice, setSelectedItemUnitPrice] = useState("")
   const [totalBill, setTotalBill] = useState<number>(0)

   const createDeliveryOrder = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {


      const deliveryOrder: DeliveryOrderModel = ({
         date: new Date(deliveryDate),
         transactionDate: new Date(transactionDate),
         transactionType: "asd",
         coustomer: customersName,
         shippingAddress: address,
         companyId: "1",
         totalBill: totalBill,
         status: 0,
      });

      DeliveryOrderService.createDeliveryItem(deliveryOrder).then((val) => {


      });

      //handleOk(e);
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
      if (deliveryOrder) {
         setTransactionDate(deliveryOrder.transactionDate.toLocaleDateString());
         setDeliveryDate(deliveryOrder.date.toLocaleDateString());
         setTotalBill(deliveryOrder.totalBill);
         setCustomersName(deliveryOrder.coustomer);
         setAddress(deliveryOrder.shippingAddress);
      }
   }, [selectedItems, deliveryOrder])

   return (
      <Modal
         title="Create Delivery Order"
         open={shouldOpen}
         onOk={createDeliveryOrder}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         width={1000}
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
                  >
                     <Input placeholder="Enter here" onChange={(val) => { setCustomersName(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="address"
                     label="Address"
                  >
                     <TextArea placeholder='Enter Here' rows={6} onChange={(val) => { setAddress(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>

         </Form>
         <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />

         <Table columns={columns} className="table" dataSource={selectedItems} />
         <h1> Total Bill : {totalBill}</h1>
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

export default CreateDeliveryOrderModal