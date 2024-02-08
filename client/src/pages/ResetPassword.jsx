import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { NewPassword } from '../models';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { sendData } from '../utils';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const toast = useToast();
    const [viewNew, setViewNew] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(NewPassword)
    });

    const handleNewPass = async d => {
        setLoading(true);
        try {
            const { message, code } = await sendData('reset-password', { ...d, token });

            toast({
                description: message,
                status: code === 200 ? 'success' : 'error',
                duration: 2000,
                isClosable: true
            });

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
                <form onSubmit={handleSubmit(handleNewPass)}>
                    <FormControl mb={3} isInvalid={errors.newpass}>
                        <FormLabel>Senha nova</FormLabel>
                        <InputGroup>
                            <Input
                                autoComplete="new-password"
                                placeholder="Senha nova"
                                type={viewNew ? 'text' : 'password'}
                                {...register('newpass')}
                            />
                            <InputRightElement>
                                <IconButton onClick={() => setViewNew(prev => !prev)} icon={viewNew ? <ViewOffIcon /> : <ViewIcon />} />
                            </InputRightElement>
                        </InputGroup>
                        {errors.newpass && <FormErrorMessage>{errors.newpass.message}</FormErrorMessage>}
                    </FormControl>
                    <Button type="submit" w={'100%'} colorScheme="green">
                        Alterar senha
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default ResetPassword;
