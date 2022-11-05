
import http, { post, put } from "../http-common"
import { SalesOderModel } from "../models/sales_order_model"
import companyId from "../config"
const url = "http://127.0.0.1:8090";


const getSalesItems = async (offset: number, pagination: number): Promise<SalesOderModel[]> => {
   return await http.get(`sales-order/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get sales orders failed ${err}`);
      return [];
   }
   )

}

const updateDeliverItem =async(id: string, SalesOrder: SalesOderModel) => {
 await  put(`${url}/sales-order/update-sales-order/${id}`,
      {
         date: SalesOrder.date,
         transactionDate: SalesOrder.transactionDate,
         transactionType: SalesOrder.transactionType,
         coustomer: SalesOrder.coustomer,
         shippingAddress: SalesOrder.shippingAddress,
         totalBill: SalesOrder.totalBill,
         status: SalesOrder.status,
         customerType: "a",
         companyId: SalesOrder.companyId,
      }
   ).then(result => result.status);
}

const createSalesItem = async (SalesOrder: SalesOderModel) => {
 

   post(url + "/sales-order/create-sales-order",
      {
         date: SalesOrder.date,
         transactionDate: SalesOrder.transactionDate,
         transactionType: SalesOrder.transactionType,
         coustomer: SalesOrder.coustomer,
         shippingAddress: SalesOrder.shippingAddress,
         totalBill: SalesOrder.totalBill,
         status: SalesOrder.status,
         customerType: "a",
         companyId: SalesOrder.companyId,
      },
   ).then(result => {
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteSalesItem = async (id: string) => {
   await http.delete(`sales-order/delete-sales-order/${id}`).then(result => result.status);
}

const SalesOrderService = { getSalesItems, updateDeliverItem, createSalesItem, deleteSalesItem }

export default SalesOrderService