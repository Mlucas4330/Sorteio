import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, useToast, Spinner, Text, Highlight, FormErrorMessage, Container } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendData } from '../utils';
import { UserSignUp } from '../models';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(UserSignUp)
    });

    const handleUser = async d => {
        try {
            setLoading(true);

            const { message, code } = await sendData('signup', d);

            if (code !== 201) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                });
                return;
            }

            toast({
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true
            });

            navigate('/signin');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Spinner size={'xl'} position={'fixed'} top={10} right={10} />}
            <Link to={'/'}>
                <Button m={7} colorScheme="yellow">
                    Voltar
                </Button>
            </Link>
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
                        <Input autoComplete="new-password" placeholder="Senha" type="password" {...register('password')} />
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
    );
}

export default SignUp;
