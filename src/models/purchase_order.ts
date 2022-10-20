export interface PhurchaseOrder {
    _id : string,
    name: string;
    description: string;
    manufacturer: string;
    supplier: string;
    in_stock_amount: number;
    unit_price: number;
    type: string;
}