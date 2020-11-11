interface IUser {
  ID: number;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  googleId?: string;
  facebookId: string;
}

export default IUser;
