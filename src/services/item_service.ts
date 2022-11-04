
import http, { post, put } from "../http-common"
import { ItemModel } from "../models/item_model"
import companyId from "../config"
const url = "http://127.0.0.1:8080";


const getDeliveryItems = async (offset: number, pagination: number): Promise<ItemModel[]> => {
   return await http.get(`item-controller/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.items;
   }).catch(err => {
      console.log(`get items failed ${err}`);
      return [];
   }
   )

}

const updateDeliverItem = (id: number, item: ItemModel) => {
   put(url + "/item-controller" + { id },
      {
         name: item.name,
         price: item.price,
         inStock: item.inStock,
         manufacturer: item.manufacturer,
         supplier: item.supplier,
      }
   ).then(result => result.data);
}

const createDeliveryItem = async (item: ItemModel) => {


   post(url + "/item-controller",
      {
         name: item.name,
         price: item.price,
         inStock: item.inStock,
         manufacturer: item.manufacturer,
         supplier: item.supplier,
         companyId: item.companyId
      },
   ).then(result => {
      console.log(result.data);
      return result.data;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = async (id: string) => {
   console.log("called")
   await http.delete(`item-controller/${id}`).then(result => result.data);
}

const ItemService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default ItemService