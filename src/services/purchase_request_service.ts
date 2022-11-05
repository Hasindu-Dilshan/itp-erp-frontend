
import http, { post, put } from "../http-common"
import { PhurchaseRequestModel } from "../models/purchase_request"
import companyId from "../config"
const url = "http://127.0.0.1:8080";


const getPurchaseRequests = async (offset: number, pagination: number): Promise<PhurchaseRequestModel[]> => {
   return await http.get(`purchase-request/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.purchaseRequests;
   }).catch(err => {
      console.log(`get purchaseRequests failed ${err}`);
      return [];
   }
   )

}

const updatePurchaseRequest = async (id: string, purchaseRequest: PhurchaseRequestModel) => {
   await put(`${url}/purchase-request/${id}`,
      {
         requestBy: purchaseRequest.requestBy,
         totalBill: purchaseRequest.totalBill,
         status: purchaseRequest.status,
      }
   ).then(result => result.data);
}

const createPurchaseRequest = async (purchaseRequest: PhurchaseRequestModel) => {


   post(url + "/purchase-request/",
      {
          requestBy: purchaseRequest.requestBy,
         totalBill: purchaseRequest.totalBill,
         status: purchaseRequest.status,
      },
   ).then(result => {
      console.log(result.data);
      return result.data;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deletePurchaseRequest = async (id: string) => {
   console.log("called")
   await http.delete(`purchase-request/${id}`).then(result => result.data);
}

const PurchaseRequestService = { getPurchaseRequests, updatePurchaseRequest, createPurchaseRequest, deletePurchaseRequest }

export default PurchaseRequestService