import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto, createUserDto } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("register")
	register(@Body() body: createUserDto) {
		return this.authService.register(body);
	}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	login(@Body() body: LoginUserDto) {
		return this.authService.login(body);
	}
}
