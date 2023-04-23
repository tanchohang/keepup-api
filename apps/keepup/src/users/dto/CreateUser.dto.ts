import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(30)
  firstname: string;

  @IsNotEmpty()
  @MaxLength(30)
  lastname: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @Matches(/^\S+$/, { message: 'unsername cannot have spaces' })
  @Matches(/^[a-zA-Z].*/, { message: 'usename must start with a letter' })
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'username cannot have special characters other than _',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[\d+]/, { message: 'password must have a number' })
  @Matches(/[A-Z+]/, { message: 'password must have an uppercase letter' })
  @Matches(/[a-b+]/, { message: 'password must have a lowercase letter' })
  @Matches(
    /^(?=.*[!@#$£+~=_/\-€`%^&*(),.?":;{}|<>])[a-zA-Z0-9!@#$£+~=_/\-€`%^&*(),.?":;{}|<>]+$/,
    {
      message: 'password must have special character and no spaces',
    },
  )

  // @Matches(/[]/, { message: 'password must have no spaces' })
  password: string;
}
