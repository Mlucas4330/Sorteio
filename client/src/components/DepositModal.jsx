import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftAddon,
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
    ButtonGroup
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { baseUrlSocket, getToken, sendData } from '../utils';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import copy from 'copy-to-clipboard';
import io from 'socket.io-client';

function DepositModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [pixCopiaECola, setPixCopiaECola] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isPayed, setIsPayed] = useState(false);
    const amountRef = useRef(null);
    const toast = useToast();
    const token = getToken();
    const socket = io(baseUrlSocket);

    const handleDeposit = async () => {
        if (!token) {
            toast({
                description: 'Você precisar logar antes de depositar',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
            return;
        }

        try {
            setLoading(true);
            const { data, message, code } = await sendData(
                'deposit',
                {
                    amount: amountRef.current.value
                },
                token
            );

            if (code !== 201) {
                toast({
                    description: message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                });
                return;
            }

            setQrCode(data.imagemQrcode);
            setPixCopiaECola(data.pixCopiaECola);

            toast({
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        const isCopy = copy(pixCopiaECola);

        if (isCopy) {
            toast({
                description: 'Copiado para a área de transferência',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        }
    };

    socket.on('payed', payed => {
        setIsPayed(payed);
        setQrCode(null);
        setPixCopiaECola(null);
    });

    return (
        <>
            <Modal
                size={{
                    base: 'sm',
                    sm: 'md',
                    md: '3xl',
                    lg: '4xl'
                }}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Faça um pix!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <InputGroup>
                            <InputLeftAddon>R$</InputLeftAddon>
                            <NumberInput w={'100%'} min={1.0} defaultValue={1.0} precision={2} step={0.01}>
                                <NumberInputField ref={amountRef} borderRadius={0} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>

                        {isPayed ? (
                            <Box textAlign={'center'} color="green" mt={5}>
                                <CheckIcon w={10} h={10} />
                                <Heading>Pago com sucesso!</Heading>
                                <Text>Você agora está participando do sorteio atual.</Text>
                            </Box>
                        ) : (
                            qrCode &&
                            pixCopiaECola && (
                                <>
                                    <Center>
                                        <Image src={qrCode} alt="qrcode" />
                                    </Center>

                                    <Text textAlign={'center'}>Escaneie o QrCode acima para finalizar o depósito!</Text>

                                    <Box position="relative" padding="10">
                                        <Divider />
                                        <AbsoluteCenter bg="white" px="4">
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
                            )
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {isPayed ? (
                            <Button
                                onClick={() => {
                                    setIsPayed(false);
                                    onClose();
                                }}
                            >
                                Fechar
                            </Button>
                        ) : (
                            <ButtonGroup>
                                <Button colorScheme="red" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    isLoading={loading}
                                    loadingText="Gerando"
                                    spinnerPlacement="end"
                                    onClick={handleDeposit}
                                    colorScheme="green"
                                >
                                    Depositar
                                </Button>
                            </ButtonGroup>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DepositModal;
