import { EmailAuthCredential } from 'firebase/auth';
import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, "密码至少8个字符")
    .regex(/(?=.*[a-z])/, "密码至少包含一个小写字母")
    .regex(/(?=.*[A-Z])/, "密码至少包含一个大写字母")
    .regex(/!@#$%^&*(),.?;'[\]{}|<>]/, "密码至少包含一个特殊字符")
})