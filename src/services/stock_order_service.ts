
import http, { post, put } from "../http-common"
import { StockOrderModel } from "../models/stock_order_model"
import companyId from "../config"
const url = "http://127.0.0.1:8090";


const getOrderQty = async (offset: number, pagination: number): Promise<StockOrderModel[]> => {
   return await http.get(`stock-order-controller/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get items failed ${err}`);
      return [];
   }
   )
}

const updateOrderQty = async (id: string, item: StockOrderModel) => {
 await  put(url + "/stock-order-controller" + { id },
      {
        name: item.name,
        price: item.price,
        manufacturer: item.manufacturer,
        orderqty: item.orderqty,
      }
   ).then(result => result.data);
}

const createStockQty = async (item: StockOrderModel) => {


   post(url + "/stock-order-controller",
      {
         name: item.name,
         price: item.price,
         manufacturer: item.manufacturer,
         orderqty: item.orderqty,
      },
   ).then(result => {
      console.log(result.data);
      return result.data;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteOrderQty = async (id: string) => {
   await http.delete(`stock-order-controller/${id}`).then(result => result.data);
}

const StockOrderService = { getOrderQty, updateOrderQty, createStockQty, deleteOrderQty }

export default StockOrderService