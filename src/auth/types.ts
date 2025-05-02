export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  age: number;
  created_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  created_at: string;
}
