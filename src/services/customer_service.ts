
import http, { post, put } from "../http-common"
import { CustomeModel } from "../models/customer_model"
import companyId from "../config"
const url = "http://127.0.0.1:8080";


const getCustomers = async (offset: number, pagination: number): Promise<CustomeModel[]> => {
   return await http.get(`customer/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.customers;
   }).catch(err => {
      console.log(`get sales orders failed ${err}`);
      return [];
   }
   )

}

const updateCustomer = async(id: string, Customer: CustomeModel) => {
  await put(url + `/customer/update-customer/${id}`,
      {
         date: Customer.date,
         name: Customer.name,
         nic: Customer.nic,
         mobile: Customer.mobile,
         email: Customer.email,
         address: Customer.address,

         companyId: Customer.companyId,
      }
   ).then(result => result.status);
}

const createCustomer = async (Customer: CustomeModel) => {
 

   post(url + "/customer/create-customer",
      {
         date: Customer.date,
         name: Customer.name,
         nic: Customer.nic,
         mobile: Customer.mobile,
         email: Customer.email,
         address: Customer.address,
         companyId: Customer.companyId,
      }
   ).then(result => {
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteCustomer = async (id: string) => {
   await http.delete(`customer/delete-customer/${id}`).then(result => result.status);
}

const CustomerService = { getCustomers, updateCustomer, createCustomer, deleteCustomer }

export default CustomerService