import { ArrowUpIcon } from '@chakra-ui/icons'
import {
    InputGroup,
    Input,
    InputRightElement,
    IconButton,
    useToast,
    Heading,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getToken, socket } from '../utils'
import Message from './Message'
import useFetchData from '../hooks/useFetchData'

// eslint-disable-next-line react/prop-types
function Chat({ isOpen, onClose }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const toast = useToast()
    const token = getToken()

    const getMessages = async () => {
        try {
            const { data, code } = await useFetchData('messages')

            if (code === 200) {
                setMessages(data.messages)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    const sendMessage = () => {
        if (!token) {
            toast({
                description: 'Você precisa logar antes de usar o chat',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }

        if (message !== '') {
            socket.emit('message', { token, text: message })
            socket.on('message', msg => setMessages([...messages, JSON.parse(msg)]))
            setMessage('')
        }
    }

    const handleMessage = e => {
        setMessage(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <Drawer isOpen={isOpen} placement='left' onClose={onClose} size={'sm'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Chat</DrawerHeader>
                <DrawerBody>
                    {messages.length > 0 ? (
                        messages.map(data => <Message key={data.id} data={data} token={token} />)
                    ) : (
                        <Heading color={'gray.400'}>Opss... Ainda não há mensagens no sorteio atual.</Heading>
                    )}
                </DrawerBody>
                <DrawerFooter>
                    <InputGroup>
                        <Input
                            value={message}
                            onChange={handleMessage}
                            onKeyDown={handleKeyDown}
                            type='text'
                            placeholder='Escreva sua mensagem'
                        />
                        <InputRightElement>
                            <IconButton onClick={sendMessage} icon={<ArrowUpIcon />}></IconButton>
                        </InputRightElement>
                    </InputGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Chat
