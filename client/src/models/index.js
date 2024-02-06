import { z } from 'zod';

const UserSignUp = z.object({
    username: z
        .string({
            required_error: 'Usuário é obrigatório'
        })
        .min(3, {
            message: 'Usuário deve conter pelo menos 3 caracteres'
        })
        .max(50, {
            message: 'Usuário deve conter no máximo 50 caracteres'
        })
        .trim(),
    email: z
        .string({
            required_error: 'Email é obrigatório'
        })
        .email({
            message: 'Email inválido'
        })
        .trim(),
    password: z
        .string({
            required_error: 'Senha é obrigatória'
        })
        .min(5, {
            message: 'Senha deve conter pelo menos 5 caracteres'
        })
        .max(80, {
            message: 'Senha deve conter no máximo 80 caracteres'
        })
        .trim(),

    pix: z
        .string({
            required_error: 'Chave PIX é obrigatória'
        })
        .trim()
});

const UserSignIn = z.object({
    email: z
        .string({
            required_error: 'Email é obrigatório'
        })
        .email({
            message: 'Email inválido'
        })
        .trim(),
    password: z
        .string({
            required_error: 'Senha é obrigatória'
        })
        .min(5, {
            message: 'Senha deve conter pelo menos 5 caracteres'
        })
        .max(80, {
            message: 'Senha deve conter no máximo 80 caracteres'
        })
        .trim()
});

const Password = z.object({
    oldpass: z
        .string({
            required_error: 'Senha é obrigatória'
        })
        .trim(),
    newpass: z
        .string({
            required_error: 'Nova senha é obrigatória'
        })
        .min(5, {
            message: 'Nova senha deve conter pelo menos 5 caracteres'
        })
        .max(80, {
            message: 'Nova senha deve conter no máximo 80 caracteres'
        })
        .trim()
});

const NewPassword = z.object({
    newpass: z
        .string({
            required_error: 'Nova senha é obrigatória'
        })
        .min(5, {
            message: 'Nova senha deve conter pelo menos 5 caracteres'
        })
        .max(80, {
            message: 'Nova senha deve conter no máximo 80 caracteres'
        })
        .trim()
});


const Email = z.object({
    email: z
        .string({
            required_error: 'Email é obrigatório'
        })
        .email({
            message: 'Email inválido'
        })
        .trim()
});

export { UserSignUp, UserSignIn, Password, NewPassword, Email };
