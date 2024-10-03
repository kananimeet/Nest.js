import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

 export class AdminDto{

    @IsNotEmpty()
    @IsString()  
    adminname: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string
  }
  
  export class AdminDtos{
    @IsEmail()
    email:string;
  
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password:string;
  }
  