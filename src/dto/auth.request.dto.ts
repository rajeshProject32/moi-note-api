import mongoose from 'mongoose';

export class AuthRequestDto {
  username: string;
  password: string;
}

export class SignupRequestDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  termsAndCondChecked: boolean;
}
