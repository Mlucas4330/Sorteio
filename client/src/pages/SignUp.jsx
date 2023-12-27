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
            ).min(3)
                .max(50)
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
                message: 'Senha deve ter pelo menos 5 caracteres'
            }).max(80, {
                message: 'Senha deve ter no máximo 80 caracteres'
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

            <header>
                <Button colorScheme="yellow" position={'fixed'} top={10} left={10}>
                    <Link to={'/'}>Voltar</Link>
                </Button>
            </header>

            <Center h={'100vh'}>
                <Box w={'50%'}>
                    <form onSubmit={handleSubmit(handleUser)}>
                        <FormControl mb={3} isRequired>
                            <FormLabel>Usuário</FormLabel>
                            <Input {...register('username')} />
                            {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input {...register('email')} />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isRequired>
                            <FormLabel>Senha</FormLabel>
                            <Input {...register('passowrd')} />
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mb={3} isRequired>
                            <FormLabel>Chave PIX</FormLabel>
                            <Input {...register('pix')} />
                            {errors.pix && <FormErrorMessage>{errors.pix.message}</FormErrorMessage>}
                        </FormControl>

                        <Button type='submit' colorScheme='green'>Cadastrar</Button>
                    </form>

                    <Text mt={3}>
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