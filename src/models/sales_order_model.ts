export interface SalesOderModel {
    _id: string;
    date: Date;
    transactionDate: Date;
    transactionType: string;
    coustomer: string;
    shippingAddress: string;
    totalBill: number;
    status: number;
    companyId: string;
    itemId : string,
    itemName : string,
}