
import http, { post, put } from "../http-common"
import { PhurchaseOrderModel } from "./../models/purchase_order"
import companyId from "../config"
const url = "http://127.0.0.1:8090";


const getPurchaseOrders = async (offset: number, pagination: number): Promise<PhurchaseOrderModel[]> => {
   return await http.get(`purchase-order/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get purchase orders failed ${err}`);
      return [];
   }
   )

}

const updatePurchaseOrder = (id: number, purchaseOrder: PhurchaseOrderModel) => {
   put(url + "/update-purchase-order/" + { id },
      {
        purchaseOrderDate: purchaseOrder.purchaseOrderDate,
         suppierName: purchaseOrder.suppierName,
         store: purchaseOrder.store,
         netAmount: purchaseOrder.netAmount,
         status: purchaseOrder.status,
         companyId: purchaseOrder.companyId,
      }
   ).then(result => result.status);
}

const createDeliveryItem = async (purchaseOrder: PhurchaseOrderModel) => {


   post(url + "/purchase-order/create-purchase-order",
      {
         purchaseOrderDate: purchaseOrder.purchaseOrderDate,
         suppierName: purchaseOrder.suppierName,
         store: purchaseOrder.store,
         netAmount: purchaseOrder.netAmount,
         status: purchaseOrder.status,
         companyId: purchaseOrder.companyId,
      },
   ).then(result => {
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = async (id: string) => {
   await http.delete(`purchase-order/delete-purchase-order/${id}`).then(result => result.status);
}

const PurchaseOrderService = { getPurchaseOrders, updatePurchaseOrder, createDeliveryItem, deleteDeliveryItem }

export default PurchaseOrderService