import React, { useState } from 'react'
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast,
    Spinner,
    Text,
    Highlight,
    Center,
    Box,
    FormErrorMessage
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../main'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function SignUp() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const User = z.object(
        {
            username: z.string(
                {
                    required_error: 'Usuário é obrigatório'
                }
            ).min(3, {
                message: 'Usuário deve conter pelo menos 3 caracteres'
            })
            .max(50, {
                message: 'Usuário deve conter no máximo 50 caracteres'
            })
            .trim(),
            email: z.string(
                {
                    required_error: 'Email é obrigatório'
                }
            ).email(
                {
                    message: 'Email inválido'
                }
            ).trim(),
            password: z.string(
                {
                    required_error: 'Senha é obrigatória'
                }
            ).min(5, {
                message: 'Senha deve conter pelo menos 5 caracteres'
            }).max(80, {
                message: 'Senha deve conter no máximo 80 caracteres'
            }).trim(),

            pix: z.string(
                {
                    required_error: 'Chave PIX é obrigatória'
                }
            ).trim()
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(User)
    })

    const handleUser = async d => {
        try {
            setLoading(true)

            const response = await fetch(URL + 'signup', {
                method: 'POST',
                body: JSON.stringify(d),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const { message, code } = await response.json()

            if (code !== 201) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
                return
            }

            toast({
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true
            })

            navigate('/signin')
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Spinner size={'xl'} position={'fixed'} top={10} right={10} />}
            <Button m={5} colorScheme="yellow">
                <Link to={'/'}>Voltar</Link>
            </Button>
            <Center h={'90vh'}>
                <Box w={{
                    base: '80%',
                    sm: '50%',
                    md: '70%',
                    lg: '50%'
                }}>
                    <form onSubmit={handleSubmit(handleUser)}>
                        <FormControl mb={3} isInvalid={errors.username}>
                            <FormLabel>Usuário</FormLabel>
                            <Input {...register('username')} />
                            {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' {...register('email')} />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors.password}>
                            <FormLabel>Senha</FormLabel>
                            <Input type='password' {...register('passowrd')} />
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors.pix}>
                            <FormLabel>Chave PIX</FormLabel>
                            <Input {...register('pix')} />
                            {errors.pix && <FormErrorMessage>{errors.pix.message}</FormErrorMessage>}
                        </FormControl>

                        <Button w={'100%'} type='submit' colorScheme='green'>Cadastrar</Button>
                    </form>

                    <Text textAlign={{
                        base: 'center',
                        sm: 'left'
                    }} mt={{
                        base: 5,
                        sm: 3,
                        md: 3,
                        lg: 3
                    }}>
                        Já tem conta?
                        <Link to={'/signin'}>
                            <Highlight query='Clique aqui para entrar' styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                                Clique aqui para entrar
                            </Highlight>
                        </Link>
                    </Text>
                </Box>
            </Center>
        </>
    )
}

export default SignUp