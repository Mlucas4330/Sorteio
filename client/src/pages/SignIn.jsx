import React, { useState } from 'react';
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
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    IconButton,
    Container,
    Flex,
    GridItem,
    Grid
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { sendData, setToken } from '../utils';
import { UserSignIn } from '../models';

function SignIn() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(false);
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(UserSignIn)
    });

    const handleUser = async d => {
        try {
            setLoading(true);

            const { data, message, code } = await sendData('signin', d);

            if (code !== 200) {
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

            setToken(data.token);

            navigate('/');
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
                    <FormControl mb={3} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input autoComplete="on" placeholder="Email" type="email" {...register('email')} />
                        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mb={3} isInvalid={errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <InputGroup>
                            <Input
                                autoComplete="current-password"
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
                    <Button w={'100%'} type="submit" colorScheme="green">
                        Entrar
                    </Button>
                </form>

                <Text mt={5} textAlign={'center'}>
                    Ainda não tem conta?
                    <Link to={'/signup'}>
                        <Highlight query={'Clique aqui para se cadastrar'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            Clique aqui para se cadastrar
                        </Highlight>
                    </Link>
                </Text>
            </Container>
        </>
    );
}

export default SignIn;
