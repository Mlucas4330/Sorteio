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
    FormErrorMessage,
    Container,
    InputGroup,
    InputRightElement,
    IconButton
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUp } from '../models'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useSendData from '../hooks/useSendData'
import HomeButton from '../fragments/HomeButton'

function SignUp() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [view, setView] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(UserSignUp)
    })

    const handleUser = async d => {
        try {
            setLoading(true)

            const { message, code } = await useSendData('signup', d)

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
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Spinner size={'xl'} position={'fixed'} top={10} right={10} />}
            
            <HomeButton />

            <Container maxW={'container.sm'}>
                <form onSubmit={handleSubmit(handleUser)}>
                    <FormControl mb={3} isInvalid={errors.username}>
                        <FormLabel>Usuário</FormLabel>
                        <Input autoComplete="username" placeholder="Usuário" {...register('username')} />
                        {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl mb={3} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input autoComplete="email" placeholder="Email" type="email" {...register('email')} />
                        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl mb={3} isInvalid={errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <InputGroup>
                            <Input
                                autoComplete="new-password"
                                placeholder="Senha"
                                type={view ? 'text' : 'password'}
                                {...register('password')}
                            />
                            <InputRightElement>
                                <IconButton onClick={() => setView(prev => !prev)} icon={view ? <ViewOffIcon /> : <ViewIcon />} />
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl mb={3} isInvalid={errors.pix}>
                        <FormLabel>Chave PIX</FormLabel>
                        <Input placeholder="Chave PIX" {...register('pix')} />
                        {errors.pix && <FormErrorMessage>{errors.pix.message}</FormErrorMessage>}
                    </FormControl>

                    <Button w={'100%'} type="submit" colorScheme="green">
                        Cadastrar
                    </Button>
                </form>

                <Text mt={5} textAlign={'center'}>
                    Já tem conta?
                    <Link to={'/signin'}>
                        <Highlight query="Clique aqui para entrar" styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            Clique aqui para entrar
                        </Highlight>
                    </Link>
                </Text>
            </Container>
        </>
    )
}

export default SignUp
