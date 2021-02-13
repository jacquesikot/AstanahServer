interface IProduct {
  id: number;
  Meta_thumbnail_id: string;
  Title: string;
  Description: string;
  Short_Desc: string;
  Regular_price: string;
  Sale_price: string;
  Gallery: string;
  Categories: string;
  count: number;
}

type statusType = 'processing' | 'rejected' | 'delivered';

interface IOrder {
  user_id: number;
  payment_method: string;
  set_paid: number;
  billing_id: number;
  status: statusType;
  total: string;
  products: IProduct[];
}
export default IOrder;
