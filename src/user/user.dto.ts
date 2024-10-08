import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class AuthDto {

    @IsNotEmpty()
    @IsString()
    firstname: string;
  
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @IsNotEmpty()
    @IsString()
    nickname: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;
  
    @IsNotEmpty()
   confirmpassword: string;

   @IsNotEmpty()
   imageUpload: string;

   
   @IsNotEmpty()
   address: string;
  }
  

  // login Dto
 export class AuthDtos{
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;   
  }
  