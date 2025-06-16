import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWTStrategy } from "./jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => ({
				secret: config.get("JWT_SECRET"),
				signOptions: { expiresIn: "1h" },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy],
	exports: [AuthService],
})
export class AuthModule {}
