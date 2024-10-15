import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Firstname should not be empty' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname should not be empty' })
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Nickname should not be empty' })
  nickname: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  confirmpassword: string;

  @IsString()
  @IsOptional() 
  imageUpload?: string;

  @IsString()
  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}

// Login DTO
export class AuthDtos {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;   
}
