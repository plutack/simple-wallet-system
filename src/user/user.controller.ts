import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class UserController {
	@Get("get-profile")
	@UseGuards(AuthGuard("JWT"))
	getUserDetails() {
		return {
			success: true,
			user: null,
		};
	}
}
