import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	Matches,
	IsOptional,
} from "class-validator";

export class createUserDto {
	@IsNotEmpty()
	firstName: string;
	@IsNotEmpty()
	lastName: string;
	@IsEmail()
	email: string;
	@IsNotEmpty()
	@MinLength(4, { message: "Username must be at least 4 characters long" })
	username: string;
	@IsNotEmpty()
	@MinLength(8, { message: "Password must be at least 8 characters long" })
	@MaxLength(20, { message: "Password must not exceed 16 characters" })
	@Matches(/(?=.*[A-Z])/, {
		message: "Password must contain at least one uppercase letter",
	})
	@Matches(/(?=.*[a-z])/, {
		message: "Password must contain at least one lowercase letter",
	})
	@Matches(/(?=.*\d)/, {
		message: "Password must contain at least one number",
	})
	@Matches(/(?=.*[!@#$%^&*])/, {
		message: "Password must contain at least one special character",
	})
	password: string;
}

export class LoginUserDto {
	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
