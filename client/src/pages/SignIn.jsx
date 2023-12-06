import React, { useState } from 'react'
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast,
    Spinner,
    Center,
    Box,
    Text,
    Highlight,
    FormErrorMessage
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../main'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function SignIn() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const User = z.object({
        email: z.string({
            required_error: 'Email é obrigatório'
        }).email({
            message: 'Email inválido'
        }).trim(),
        password: z.string({
            required_error: 'Senha é obrigatória'
        }).min(5).max(80).trim()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(User)
    })

    const handleUser = async d => {
        try {
            setLoading(true)
            console.log(register)
            const response = await fetch(URL + 'signin', {
                method: 'POST',
                body: JSON.stringify(d),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const { data, message, code } = await response.json()

            if (code !== 200) {
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

            localStorage.setItem('token', data.token)

            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUser()
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
                            <FormLabel>Email</FormLabel>
                            <Input onKeyDown={handleKeyDown} type='email' {...register('email')} />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl mb={3} isRequired>
                            <FormLabel>Senha</FormLabel>
                            <Input onKeyDown={handleKeyDown} type='password' {...register('password')} />
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>

                        <Button type='submit' colorScheme='green'>Entrar</Button>
                    </form>
                    
                    <Text mt={3}>
                        Ainda não tem conta?
                        <Link to={'/signup'}>
                            <Highlight query={'Clique aqui para se cadastrar'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                                Clique aqui para se cadastrar
                            </Highlight>
                        </Link>
                    </Text>
                </Box>
            </Center>
        </>
    )
}

export default SignIn