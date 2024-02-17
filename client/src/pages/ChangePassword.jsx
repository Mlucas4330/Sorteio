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
    useToast,
} from '@chakra-ui/react'
import { Password } from '../models'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getToken } from '../utils'
import useSendData from '../hooks/useSendData'
import HomeButton from '../fragments/HomeButton'

const ChangePassword = () => {
    const [viewOld, setViewOld] = useState(false)
    const [viewNew, setViewNew] = useState(false)
    const token = getToken()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Password),
    })

    const handleChangePass = async d => {
        try {
            setLoading(true)

            const { code, message } = useSendData('change-password', d, token)

            if (code !== 200) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                return
            }

            toast({
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
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
                <form onSubmit={handleSubmit(handleChangePass)}>
                    <FormControl mb={3} isInvalid={errors.oldpass}>
                        <FormLabel>Senha antiga</FormLabel>
                        <InputGroup>
                            <Input
                                autoComplete='current-password'
                                placeholder='Senha antiga'
                                type={viewOld ? 'text' : 'password'}
                                {...register('oldpass')}
                            />
                            <InputRightElement>
                                <IconButton onClick={() => setViewOld(prev => !prev)} icon={viewOld ? <ViewOffIcon /> : <ViewIcon />} />
                            </InputRightElement>
                        </InputGroup>
                        {errors.oldpass && <FormErrorMessage>{errors.oldpass.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mb={3} isInvalid={errors.newpass}>
                        <FormLabel>Senha nova</FormLabel>
                        <InputGroup>
                            <Input
                                autoComplete='new-password'
                                placeholder='Senha nova'
                                type={viewNew ? 'text' : 'password'}
                                {...register('newpass')}
                            />
                            <InputRightElement>
                                <IconButton onClick={() => setViewNew(prev => !prev)} icon={viewNew ? <ViewOffIcon /> : <ViewIcon />} />
                            </InputRightElement>
                        </InputGroup>
                        {errors.newpass && <FormErrorMessage>{errors.newpass.message}</FormErrorMessage>}
                    </FormControl>
                    <Button w={'100%'} type='submit' colorScheme='green'>
                        Alterar senha
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default ChangePassword
