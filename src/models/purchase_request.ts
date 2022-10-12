export interface PhurchaseRequest {
    _id: string,
    date: Date,
    orderNumber: string,
    referenceNumber: string,
    shippingAddress: string,
    description:string,
    customer: number,
    itemId: number,
    status: number,
    companyId: number,
    createAt: string,
    updateAt: string,
    deleteAt: string
  }