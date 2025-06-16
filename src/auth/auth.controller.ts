import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("register")
	register(@Body() body: RegisterSchema) {
		return this.authService.register(body);
	}

	@Post("login")
	login(@Body() body: LoginSchema) {
		return this.authService.login(body);
	}
}
