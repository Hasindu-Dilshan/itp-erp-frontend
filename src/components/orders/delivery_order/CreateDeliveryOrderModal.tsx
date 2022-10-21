import { MouseEvent, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Input } from 'antd';
import { DeliveryOrderModel } from "../../../models/delivery_order_model"
import TextArea from 'antd/lib/input/TextArea';
import DeliveryOrderService from '../../../services/delivery_order/delivery_order_service';


interface Props {
   shouldOpen: boolean,
   confirmLoading: boolean,
   handleOk: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void)
}

const CreateDeliveryOrderModal = ({ shouldOpen, handleOk, handleCancel, confirmLoading }: Props) => {
   const [transactionDate, setTransactionDate] = useState("2022-10-12");
   const [deliveryDate, setDeliveryDate] = useState("2022-10-15");
   const [customersName, setCustomersName] = useState("");
   const [address, setAddress] = useState("");
   const [totalBill, setTotalBill] = useState(0)


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

      DeliveryOrderService.createDeliveryItem(deliveryOrder).then((val)=>{
         console.log(val);

      });

      handleOk(e);
   }



   return (
      <Modal
         title="Create Delivery Order"
         open={shouldOpen}
         onOk={createDeliveryOrder}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         width={1000}
      >
         <Form>
            <Row>
               <Col span={12}>
                  <Form.Item
                     name="transaction-date"
                     label="Transaction Date"
                  >
                     <DatePicker onChange={(val) => { }} />
                  </Form.Item>
               </Col>
               <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Item
                     name="delivery-date"
                     label="Delivery Date"
                  >
                     <DatePicker />
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
      </Modal>
   )
}

export default CreateDeliveryOrderModal