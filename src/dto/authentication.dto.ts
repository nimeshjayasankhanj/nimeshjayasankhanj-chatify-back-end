export type RegisterDTO = {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  user_type: number;
};

export interface SignatureDTO {
  _id: string;
  email: string;
  name: string;
  // token: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  user_type: number;
}

export interface LoginPayload {
  _id: string;
  email: string;
  name: string;
  token: string;
}

export type EditProfileDTO = {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
};

export type UpdatedEditProfileDTO = {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  _id: string;
};
