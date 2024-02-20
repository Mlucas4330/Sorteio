/* eslint-disable indent */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    InputGroup,
    Image,
    Heading,
    useToast,
    Text,
    Divider,
    Box,
    AbsoluteCenter,
    Input,
    InputRightElement,
    IconButton,
    Center,
    ButtonGroup,
    Flex,
    Highlight,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { currencyFormatter, decodeToken, getToken, socket } from '../utils'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'
import copy from 'copy-to-clipboard'
import useSendData from '../hooks/useSendData'

// eslint-disable-next-line react/prop-types
function DepositModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false)
    const [pixCopiaECola, setPixCopiaECola] = useState(null)
    const [qrCode, setQrCode] = useState(null)
    const [isPayed, setIsPayed] = useState(false)
    const [amount, setAmount] = useState(1.0)
    const toast = useToast()
    const token = getToken()

    const handleDeposit = async () => {
        if (!token) {
            toast({
                description: 'Você precisar logar antes de depositar',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }

        if (!amount) {
            toast({
                description: 'Preencha um valor',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }

        try {
            setLoading(true)
            const { data, message, code } = await useSendData(
                'deposit',
                {
                    amount: amount.toFixed(2).toString(),
                },
                token,
            )

            if (code !== 201) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                return
            }

            setQrCode(data.imagemQrcode)
            setPixCopiaECola(data.pixCopiaECola)

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

    const handleCopyToClipboard = () => {
        const isCopy = copy(pixCopiaECola)

        if (isCopy) {
            toast({
                description: 'Copiado para a área de transferência',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const getPayerPayment = pyr => {
        if (token) {
            const payerId = JSON.parse(pyr)
            const { userId } = decodeToken(token)

            if (payerId === userId) {
                setIsPayed(true)
                setQrCode(null)
                setPixCopiaECola(null)
            }
        }
    }

    useEffect(() => {
        socket.on('payer payment', getPayerPayment)
    }, [])

    const handleMinusPlus = operation => {
        switch (operation) {
            case 'minus01':
                setAmount(prevAmount => (prevAmount > 0.01 ? prevAmount - 0.01 : null))
                break
            case 'minus05':
                setAmount(prevAmount => (prevAmount > 0.5 ? prevAmount - 0.5 : null))
                break
            case 'minus10':
                setAmount(prevAmount => (prevAmount > 10 ? prevAmount - 10 : null))
                break
            case 'minus100':
                setAmount(prevAmount => (prevAmount > 100 ? prevAmount - 100 : null))
                break
            case 'plus01':
                setAmount(prevAmount => prevAmount + 0.01)
                break
            case 'plus05':
                setAmount(prevAmount => prevAmount + 0.5)
                break
            case 'plus10':
                setAmount(prevAmount => prevAmount + 10)
                break
            case 'plus100':
                setAmount(prevAmount => prevAmount + 100)
                break
        }
    }

    return (
        <>
            <Modal
                size={{
                    base: 'sm',
                    sm: 'md',
                    md: '3xl',
                    lg: '4xl',
                }}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Faça um pix!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {isPayed ? (
                            <Box textAlign={'center'} color='green' mt={5}>
                                <CheckIcon w={10} h={10} />
                                <Heading>Pago com sucesso!</Heading>
                                <Text>Você agora está participando do sorteio atual.</Text>
                            </Box>
                        ) : qrCode && pixCopiaECola ? (
                            <>
                                <Center>
                                    <Image src={qrCode} alt='qrcode' />
                                </Center>

                                <Text textAlign={'center'}>Escaneie o QrCode acima para finalizar o depósito!</Text>

                                <Box position='relative' padding='10'>
                                    <Divider />
                                    <AbsoluteCenter bg='white' px='4'>
                                        OU
                                    </AbsoluteCenter>
                                </Box>

                                <InputGroup>
                                    <Input value={pixCopiaECola} type={'text'} />
                                    <InputRightElement>
                                        <IconButton icon={<CopyIcon />} onClick={handleCopyToClipboard} />
                                    </InputRightElement>
                                </InputGroup>
                            </>
                        ) : (
                            <Flex justify={'center'} align={'center'} gap={7}>
                                <ButtonGroup>
                                    <Button colorScheme='red' onClick={() => handleMinusPlus('minus100')}>
                                        - 100
                                    </Button>
                                    <Button colorScheme='red' onClick={() => handleMinusPlus('minus10')}>
                                        - 10
                                    </Button>
                                    <Button colorScheme='red' onClick={() => handleMinusPlus('minus05')}>
                                        - 0.5
                                    </Button>
                                    <Button colorScheme='red' onClick={() => handleMinusPlus('minus01')}>
                                        - 0.1
                                    </Button>
                                </ButtonGroup>

                                <Heading size={'xl'} textAlign={'center'}>
                                    <Highlight
                                        query={currencyFormatter(amount)}
                                        styles={{ borderRadius: 'md', px: '5', color: 'green', bg: 'green.100' }}
                                    >
                                        {currencyFormatter(amount)}
                                    </Highlight>
                                </Heading>

                                <ButtonGroup>
                                    <Button colorScheme='green' onClick={() => handleMinusPlus('plus01')}>
                                        + 0.1
                                    </Button>
                                    <Button colorScheme='green' onClick={() => handleMinusPlus('plus05')}>
                                        + 0.5
                                    </Button>
                                    <Button colorScheme='green' onClick={() => handleMinusPlus('plus10')}>
                                        + 10
                                    </Button>
                                    <Button colorScheme='green' onClick={() => handleMinusPlus('plus100')}>
                                        + 100
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {isPayed ? (
                            <Button
                                onClick={() => {
                                    setIsPayed(false)
                                    setAmount(1.0)
                                    onClose()
                                }}
                            >
                                Fechar
                            </Button>
                        ) : (
                            <ButtonGroup>
                                <Button colorScheme='red' onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    isLoading={loading}
                                    loadingText='Gerando'
                                    spinnerPlacement='end'
                                    onClick={handleDeposit}
                                    colorScheme='green'
                                >
                                    Depositar
                                </Button>
                            </ButtonGroup>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DepositModal
