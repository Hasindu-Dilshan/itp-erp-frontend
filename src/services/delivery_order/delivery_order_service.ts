
import http from "../../http-common"
import { DeliveryOrderModel } from "../../models/delivery_order_model"
import companyId from "../../config"



const getDeliveryItems = async (offset: number, pagination: number) : Promise<DeliveryOrderModel[]> => {
   return await http.get(`delivery-order/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get delivery orders failed ${err}`);
      return [];
   }
   )



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
   const config = {
      headers: {
         "Content-type": "application/json",
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhQGdhbWFpbC5jb20iLCJpYXQiOjE2NjU3NjIxMTMsImV4cCI6MzMzMTg4NDIyNiwiaXNzIjoiRVJQIn0.Dg-Fyrn6POmUJpBD8tyxywXVpYldkvx_mGyxrM54EUo",
      }
   };
   await http.post<any>(`http://172.28.7.29:8080/delivery-order/create-delivery-order`,
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

const deleteDeliveryItem = (id: string) => {
   http.delete(`delivery-order/delete-delivery-order/${id}`).then(result => result.status);
}

const DeliveryOrderService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default DeliveryOrderService