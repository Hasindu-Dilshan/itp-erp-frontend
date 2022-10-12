export interface PhurchaseOrder {
    _id: string,
    date: Date,
    transactionDate: Date,
    orderNumber: string,
    referenceNumber: string,
    transactionType: string,
    purchaseOrder: string,
    shippingAddress: string,
    requestOrder: number;
    BillAddress: string
    status: number,
    companyId: number,
    createAt: string,
    updateAt: string,
    deleteAt: string
}