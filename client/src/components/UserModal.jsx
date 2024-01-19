import { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
} from '@chakra-ui/react'
import { baseUrl } from '../main'

function UserModal({ isOpen, onClose }) {
    const isAuthenticated = localStorage.getItem('token')
    const [user, setUser] = useState()

    const findUser = async () => {
        const response = await fetch(baseUrl + 'current-user', {
            headers: {
                'Authorization': 'Bearer ' + isAuthenticated
            }
        })

        const { data } = await response.json()

        setUser(data.user)
    }

    useEffect(() => {
        if (isAuthenticated) {
            findUser()
        }
    })

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Perfil</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box mb={3}>
                            <Text fontWeight={'bold'}>Usuário</Text>
                            <Text>{user?.username}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontWeight={'bold'}>Chave Pix</Text>
                            <Text>{user?.pix}</Text>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserModal