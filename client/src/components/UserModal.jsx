import { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    FormLabel,
    Input,
    Button,
    ModalFooter,
    ButtonGroup,
    useToast,
    SkeletonText
} from '@chakra-ui/react';
import { fetchData, getToken, sendData } from '../utils';

function UserModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [user, setUser] = useState({});
    const [pix, setPix] = useState('');

    const token = getToken();
    const toast = useToast();

    const getUser = async () => {
        setLoading(true);
        try {
            const { data } = await fetchData('current-user', token);
            setUser(data.user);
            setPix(data.user.pix);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handlePix = async () => {
        setLoadingSubmit(true);
        try {
            const { code, message } = await sendData('user/update/pix', { pix }, token);

            toast({
                description: message,
                status: code === 200 ? 'success' : 'error',
                duration: 2000,
                isClosable: true
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Perfil</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {!loading ? (
                            <>
                                <Box mb={3}>
                                    <Text fontWeight={'bold'}>Usuário</Text>
                                    <Text>{user.username}</Text>
                                </Box>
                                <Box mb={3}>
                                    <FormLabel>Chave Pix</FormLabel>
                                    <Input type="text" value={pix} onChange={e => setPix(e.target.value)} />
                                </Box>
                            </>
                        ) : (
                            <SkeletonText />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button colorScheme="red" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                isLoading={loadingSubmit}
                                loadingText="Gerando"
                                spinnerPlacement="end"
                                onClick={handlePix}
                                colorScheme="green"
                            >
                                Salvar
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserModal;
