
import http from "../../http-common"
import { DeliveryOrderModel } from "../../models/delivery_order_model"
import baseUrl from "../../config"
import companyId from "../../config"
import axios from "axios"


const getDeliveryItems = (offset: number, pagination: number): DeliveryOrderModel[] => {
   let deliveryOrders: DeliveryOrderModel[] = [];
   http.get(`delivery-order/${companyId}/${pagination}/${offset}`).then((result) => {
      const o: [] = result.data.orders;
      o.forEach(order =>
         deliveryOrders.push(order)
      );

   }).catch(err => console.log(`get delivery orders failed ${err}`)
   )


   return deliveryOrders;
}

const updateDeliverItem = (id: number, deliveryOrder: DeliveryOrderModel) => {
   http.post(`/update-delivery-order/${id}`,
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: deliveryOrder.transactionType,
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress,
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         companyId: deliveryOrder.companyId,
      }
   ).then(result => result.status);
}

const createDeliveryItem = async (deliveryOrder: DeliveryOrderModel) => {

   console.log(baseUrl.baseUrl);
   const config = {
      headers: {
         "Content-type": "application/json",
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhQGdhbWFpbC5jb20iLCJpYXQiOjE2NjU3NjIxMTMsImV4cCI6MzMzMTg4NDIyNiwiaXNzIjoiRVJQIn0.Dg-Fyrn6POmUJpBD8tyxywXVpYldkvx_mGyxrM54EUo",
      }
   };
   axios.post(`${baseUrl.baseUrl}/delivery-order/create-delivery-order`,
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: "card",
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress, 
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         companyId: deliveryOrder.companyId,
      },
      config,
   ).then(result => {
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = (id: Number) => {
   http.delete(`/delete-delivery-order/${id}`).then(result => result.status);
}

const DeliveryOrderService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default DeliveryOrderService