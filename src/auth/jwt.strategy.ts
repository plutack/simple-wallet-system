import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "generated/prisma";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "JWT") {
	constructor(config: ConfigService) {
		super({
			secretOrKey: config.get<string>("JWT_SECRET") || "secret",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

			ignoreExpiration: true, // TODO: disable in production
		});
	}

	async validate(payload: User): Promise<User> {
		return payload;
	}
}
