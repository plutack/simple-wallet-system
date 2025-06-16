import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginSchema, RegisterSchema } from "./dto";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { User } from "generated/prisma";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async register(body: RegisterSchema) {
		try {
			const passwordHash = await argon.hash(body.password);

			const email = body.email.trim().toLowerCase();
			const username = body.username.trim().toLowerCase();

			const newUser = await this.prisma.user.create({
				data: {
					firstName: body.firstName?.trim().toLowerCase(),
					lastName: body.lastName?.trim().toLowerCase(),
					email,
					username,
					passwordHash,
				},
				select: {
					id: true,
					email: true,
					username: true,
					createdAt: true,
				},
			});

			return newUser;
		} catch (err) {
			if (
				err instanceof PrismaClientKnownRequestError &&
				err.code === "P2002"
			) {
				const target = (err.meta?.target as string[])?.[0] || "Field";
				throw new ConflictException(`${target} already in use`);
			}

			console.error("Unhandled registration error:", err);
			throw new InternalServerErrorException("Registration failed");
		}
	}

	async login(body: LoginSchema) {
		const username = body.username?.trim();
		const email = body.email?.toLowerCase().trim();

		let existingUser: User | null = null;

		if (username) {
			existingUser = await this.prisma.user.findUnique({
				where: { username },
			});
		} else if (email) {
			existingUser = await this.prisma.user.findUnique({
				where: { email },
			});
		}

		const passwordHash = existingUser?.passwordHash || "";
		const isMatch = await argon.verify(passwordHash, body.password);

		if (!existingUser || !isMatch) {
			throw new UnauthorizedException("Invalid credentials");
		}

		// JWT implementation coming right up
		return this.signToken(existingUser);
	}

	async signToken(user: Pick<User, "id" | "email" | "username">) {
		const payload = {
			sub: user.id,
			username: user.username,
			email: user.email,
		};

		return this.jwt.signAsync(payload);
	}
}
