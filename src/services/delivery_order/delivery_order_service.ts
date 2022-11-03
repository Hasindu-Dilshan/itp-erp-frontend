
import http,{post,put} from "../../http-common"
import { DeliveryOrderModel } from "../../models/delivery_order_model"
import companyId from "../../config"
const url ="http://127.0.0.1:6000";


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
   put(url+"/update-delivery-order/"+{id},
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: deliveryOrder.transactionType,
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress,
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         customerType: "a",
         companyId: deliveryOrder.companyId,
      }
   ).then(result => result.status);
}

const createDeliveryItem = async (deliveryOrder: DeliveryOrderModel) => {
   const config = {
      headers: {
         "Content-type": "application/json",
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTY2NzI5MDA0MSwiZXhwIjozMzM0OTQwMDgyLCJpc3MiOiJFUlAifQ.x-mnubQ7H2987g6uAnHqYxWM5GVrws1G4WEGOzpJJ_E",
      }
   };
 
   post(url+"/delivery-order/create-delivery-order",
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: deliveryOrder.transactionType,
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress,
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         customerType: "a",
         companyId: deliveryOrder.companyId,
      },
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