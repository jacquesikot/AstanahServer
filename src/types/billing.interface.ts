interface IBilling {
  id?: number;
  user_id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export default IBilling;
