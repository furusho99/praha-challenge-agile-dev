import { emailSchema } from '../../validations/emailSchema';

export class Email {
    private email: string;
    
    constructor(email: string) {
        const parsedEmail = emailSchema.parse(email);
        this.email = parsedEmail;
    }
    
    get value(): string {
        return this.email;
    }
    
    toString(): string {
        return this.email;
    }
}