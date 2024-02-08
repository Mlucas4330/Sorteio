import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { sendData } from '../utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Email } from '../models';
import { useState } from 'react';

const ForgotPassword = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(Email)
    });

    const handleEmail = async d => {
        setLoading(true);
        try {
            const { message, code } = await sendData('forgot-password', d);
            toast({
                description: message,
                status: code === 200 ? 'success' : 'error',
                duration: 2000,
                isClosable: true
            });
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
                <form onSubmit={handleSubmit(handleEmail)}>
                    <FormControl mb={3} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register('email')} autoComplete="on" type="email" placeholder="Email" />
                        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    <Button type="submit" w={'100%'} colorScheme="green">
                        Recuperar senha
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default ForgotPassword;
