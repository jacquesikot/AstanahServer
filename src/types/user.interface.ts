interface IUser {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
}
interface IOauthEmail {
  value: string;
  verified: boolean;
}

export interface IGoogleAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: 'google';
}

export interface IOauthUser {
  id: string;
  emails: IOauthEmail[];
  name: { familyName: string; givenName: string };
  provider: string;
}

export default IUser;
