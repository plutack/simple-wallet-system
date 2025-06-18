import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface JWTPayload {
	sub: string;
	email: string;
	username: string;
	iat?: number;
	exp?: number;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "JWT") {
	constructor(config: ConfigService) {
		super({
			secretOrKey: config.get<string>("JWT_SECRET") || "secret",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

			ignoreExpiration: true, // TODO: disable in production
		});
	}

	async validate(payload: JWTPayload): Promise<JWTPayload> {
		return payload;
	}
}
