import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guards";
import { getUser } from "src/custom.decorators/user.decorator";
import { User } from "generated/prisma";

@Controller("users")
export class UserController {
	@Get("get-profile")
	@UseGuards(JwtGuard)
	getUserDetails(@getUser() user: User) {
		return {
			success: true,
			user,
		};
	}
}
