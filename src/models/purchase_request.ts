export interface PhurchaseRequest {
  _id: string,
  date: Date,
  transactionDate: Date,
  transactionType: string,
  shippingAddress: string,
  status: number,
  companyId: string,
}