import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
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
    DrawerFooter
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { baseUrlSocket, getToken } from '../utils';
import Message from './Message';

function Chat({ isOpen, onClose }) {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const toast = useToast();
    const chatRef = useRef(null);
    const token = getToken();
    const [scroll, setScroll] = useState(false);
    const socket = io(baseUrlSocket);

    useEffect(() => {
        socket.on('messages', messages => {
            if (messages) {
                setMessages(messages);
                setScroll(true);
            }
        });
    }, []);

    socket.on('chat message', msg => {
        setMessages([...messages, msg]);
        setScroll(true);
    });

    const sendMessage = () => {
        if (!token) {
            toast({
                description: 'Você precisa logar antes de usar o chat',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
            return;
        }

        if (msg !== '') {
            socket.emit('chat message', { token, msg });
            setMsg('');
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleScroll = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        setScroll(false);
    };

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={'sm'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Chat</DrawerHeader>
                <DrawerBody ref={chatRef}>
                    {scroll && (
                        <IconButton
                            onClick={handleScroll}
                            position={'absolute'}
                            width={'10px'}
                            borderRadius={'md'}
                            style={{
                                top: '80%',
                                left: '50%',
                                translate: ('-80%', '-50%')
                            }}
                            icon={<ArrowDownIcon />}
                        />
                    )}
                    {messages.length > 0 ? (
                        messages.map(data => <Message key={data.id} data={data} token={token} />)
                    ) : (
                        <Heading color={'gray.400'}>Opss... Ainda não há mensagens no sorteio atual.</Heading>
                    )}
                </DrawerBody>
                <DrawerFooter>
                    <InputGroup>
                        <Input
                            onKeyDown={handleKeyDown}
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            type="text"
                            placeholder="Escreva sua mensagem"
                        />
                        <InputRightElement>
                            <IconButton onClick={sendMessage} icon={<ArrowUpIcon />}></IconButton>
                        </InputRightElement>
                    </InputGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default Chat;
