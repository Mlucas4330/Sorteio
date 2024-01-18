import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftAddon,
    InputGroup,
    Image,
    Grid,
    useToast,
    Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { URL } from '../main'

function DepositModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false)
    const [qrCode, setQrCode] = useState('')
    const [amount, setAmount] = useState(10.00)
    const toast = useToast()
    const isAuthenticated = localStorage.getItem('token')

    const handleDeposit = async () => {
        if (!isAuthenticated) {
            toast({
                description: 'Você precisar logar antes de depositar',
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            return
        }

        try {
            setLoading(true)
            const response = await fetch(URL + 'deposit', {
                method: 'POST',
                body: JSON.stringify({
                    amount: amount.toFixed(2)
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + isAuthenticated
                }
            })

            const { data, message, code } = await response.json()

            setAmount('')

            if (code !== 201) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
                return
            }

            setQrCode(data.qrCode)

            toast({
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Faça um depósito!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <InputGroup>
                            <InputLeftAddon>
                                R$
                            </InputLeftAddon>
                            <NumberInput w={'100%'} min={1.00} defaultValue={1.00} precision={2} step={0.01}>
                                <NumberInputField value={amount} onChange={e => setAmount(e.target.value)} borderRadius={0} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>

                        {qrCode &&
                            <Grid textAlign={'center'}>
                                <Grid justifyContent={'center'}>
                                    <Image src={qrCode} alt="qrcode" />
                                </Grid>
                                <Text>Escaneie o QrCode acima para finalizar o depósito!</Text>
                            </Grid>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Flex gap={2}>
                            <Button colorScheme='red' onClick={onClose}>
                                Fechar
                            </Button>
                            <Button isLoading={loading} loadingText='Gerando' spinnerPlacement='end' onClick={handleDeposit} colorScheme='green'>Depositar</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DepositModal