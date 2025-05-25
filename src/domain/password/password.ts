import { passwordSchema } from "@/validations/passwordSchema";

export class Password {
    private password: string;

    constructor(password: string) {
        const parsedPassword = passwordSchema.parse(password);
        this.password = parsedPassword;
    }

    get value(): string {
        return this.password;
    }

    toString(): string {
        return this.password;
    }
}