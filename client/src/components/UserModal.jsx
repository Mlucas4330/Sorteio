import { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Input,
    Button,
    ModalFooter,
    ButtonGroup,
    useToast,
    SkeletonText,
    Avatar,
    FormControl,
    VisuallyHidden
} from '@chakra-ui/react';
import { baseUrl, fetchData, getToken } from '../utils';
import { Link } from 'react-router-dom';
import useBlobToImage from '../hooks/useBlobToImage';

function UserModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [user, setUser] = useState({
        username: null,
        pix: null,
        image: null
    });
    const [image, setImage] = useState(null);
    const token = getToken();
    const toast = useToast();

    const getUser = async () => {
        setLoading(true);
        try {
            const { data } = await fetchData('current-user', token);
            setUser({
                username: data.user.username,
                pix: data.user.pix,
                image: useBlobToImage(data.user.image)
            });
            setImage(useBlobToImage(data.user.image));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleUser = async () => {
        setLoadingSubmit(true);
        try {
            const formData = new FormData();

            formData.append('pix', user.pix);
            formData.append('image', user.image);

            const response = await fetch(baseUrl + 'user/update', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const { code, message } = await response.json();

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

    const handleFile = e => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser({ ...user, image: file });
            setImage(imageUrl);
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
                                <FormControl mb={3}>
                                    <FormLabel
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        display={'flex'}
                                        alignItems={'center'}
                                        flexDirection={'column'}
                                    >
                                        <Avatar align={'center'} size="xl" src={image} />
                                        Mudar foto de perfil
                                    </FormLabel>
                                    <VisuallyHidden>
                                        <Input type="file" accept="image/*" onChange={handleFile} />
                                    </VisuallyHidden>
                                </FormControl>
                                <FormControl mb={3}>
                                    <FormLabel>Usuário</FormLabel>
                                    <Input readOnly value={user.username} />
                                </FormControl>
                                <FormControl mb={3}>
                                    <FormLabel>Chave Pix</FormLabel>
                                    <Input type="text" value={user.pix} onChange={e => setUser({ ...user, pix: e.target.value })} />
                                </FormControl>

                                <Link to={'/change-password'}>
                                    <Button>Alterar Senha</Button>
                                </Link>
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
                                onClick={handleUser}
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
