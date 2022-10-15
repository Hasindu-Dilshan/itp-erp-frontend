import http from "../../http-common"
import { DeliveryOrderModel } from "../../models/delivery_order_model"

const getDeliveryItems = (offset: number, pagination: number): DeliveryOrderModel[] => {
   let deliveryOrders: DeliveryOrderModel[] = [];
   http.get('/delivery-order/1/0/10').then((result) => {
      const o: [] = result.data.orders;
      o.forEach(order =>
         deliveryOrders.push(order)
      );
      console.log(`delivery order length ${deliveryOrders.length}`)
   }).catch(err => console.log(`get delivery orders failed ${err}`)
      )

   console.log(`deliver orders are ${deliveryOrders.length}`)
   return deliveryOrders;
}

const updateDeliverItem = (id: number) => {

}

const DeliveryOrderService = { getDeliveryItems, updateDeliverItem }

export default DeliveryOrderService