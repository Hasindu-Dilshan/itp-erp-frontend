import { Form, Modal, Row, Button, DatePicker, Input, Select, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { PhurchaseRequestModel } from '../../models/purchase_request'
import PurchaseOrderService from '../../services/purchase_request_service'
import numberValidator from '../common/number_validator'
import stringValidator from '../common/validation_helper'
import { PlusCircleOutlined } from '@ant-design/icons';
import { PurchaseRequestOrderModel } from '../../models/purchase_request_order_model'

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   request?: PhurchaseRequestModel
}



const AddPurchaseRequest = ({ isOpen, handleCancel, handleOk, request }: Props) => {

   const [status, setStatus] = useState<boolean>(false);
   const [requestTo, setRequestTo] = useState<string>("")
   const [requestToName, setRequestToName] = useState<string>("")
   const [itemName, setItemName] = useState<string>("");
   const [quantity, setQuantity] = useState<number>(0);
   const [totalBill, setTotalBill] = useState<number>(0);
   const [selectedItem, setSelectedItem] = useState<PhurchaseRequestModel>();
   const [isAddModal, setIsAddModal] = useState<boolean>(false);

   const [selectedItems,setSelectedItems] = useState<PurchaseRequestOrderModel[]>(); 


   const openCloseAddItemModal = () => {
      setIsAddModal(!isAddModal)
   }

   const createOrder = async () => {
      if (request) {
         console.log("===> " + request._id)
         const o: PhurchaseRequestModel = {
            requestBy: "1",
            totalBill: totalBill,
            status: status,
            requestTo: requestToName,
            requestToId: requestTo,

         }
         await PurchaseOrderService.updatePurchaseRequest(request._id!, o)
            .then((val) => {
               handleOk();
            })
            .catch(err => console.log(`creae sales request failed ${err}`))
      } else {
         if (selectedItem) {

            const request: PhurchaseRequestModel = {
               requestBy: "1",
               status: status,
               totalBill: totalBill,
               requestTo: requestToName,
               requestToId: requestTo,
            }
            await PurchaseOrderService.createPurchaseRequest(request)
               .then((val) => {
                  handleOk();
               })
               .catch(err => console.log(`creae sales request failed ${err}`))
         }

      }

   }


   useEffect(() => {
      if (request) {
         setTotalBill(request.totalBill)
         setStatus(request.status)
      }
   }, [request])


   const data = {
      requestBy: request?.requestBy,
      totalBill: request?.totalBill,
      status: request?.status,
      requestTo: request?.requestToId,
      requestToName: request?.requestToId
   }


   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={createOrder}
         width={1000}
         title={request ? "Edit Purchase request" : "Add Purchase request"}
         footer={null}
      >
         <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />



      </Modal>
   )
}

export default AddPurchaseRequest