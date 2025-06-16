import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";

interface JWTPayload {
	sub: string;
	email: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService,
		config: ConfigService,
	) {
		super({
			secretOrKey: config.get<string>("JWT_SECRET") || "secret",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
		});
	}

	async validate(payload: any): Promise<JWTPayload> {
		return payload as JWTPayload;
	}
}
