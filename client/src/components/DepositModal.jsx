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
    Text,
    Divider,
    Box,
    AbsoluteCenter,
    Input,
    InputRightElement,
    IconButton,
    Center
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { getToken, sendData } from '../utils';
import { CopyIcon } from '@chakra-ui/icons';
import copy from 'copy-to-clipboard';

function DepositModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [pixCopiaECola, setPixCopiaECola] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const amountRef = useRef(null);
    const toast = useToast();
    const token = getToken();

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

            setQrCode(data.qrCode);
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

                        {qrCode && pixCopiaECola && (
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
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap={2}>
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
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DepositModal;
