import http from "../../http-common"
import { DeliveryOrderModel } from "../../models/delivery_order_model"
const companyId = "1";
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
   http.post("/delivery-order/create-delivery-order",
     {
      "date": deliveryOrder.date,
      "transactionDate": deliveryOrder.transactionDate,
      "transactionType": deliveryOrder.transactionType,
      "coustomer": deliveryOrder.coustomer,
      "shippingAddress": deliveryOrder.shippingAddress,
      "totalBill": deliveryOrder.totalBill,
      "status": deliveryOrder.status,
      "companyId": deliveryOrder.companyId,
   }
   ).then(result => {
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err.data));
   // console.log("order created")

}

const deleteDeliveryItem = (id: Number) => {
   http.delete(`/delete-delivery-order/${id}`).then(result => result.status);
}

const DeliveryOrderService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default DeliveryOrderService