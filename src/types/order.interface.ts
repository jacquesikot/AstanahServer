interface IProduct {
  product_id: number;
  quantity: string;
}

interface IOrder {
  user_id: number;
  payment_method: string;
  set_paid: boolean;
  billing_id: number;
  products: IProduct[];
}
export default IOrder;
