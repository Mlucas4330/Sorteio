import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { InputGroup, Input, Grid, GridItem, InputRightElement, IconButton, useToast, Center, Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { URL } from '../main'

function Chat() {
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState({})
    const toast = useToast()
    const chatRef = useRef(null)
    const isAuthenticated = localStorage.getItem('token')
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        const socket = io(URL)

        // Pega mensagens
        socket.on('messages', msg => setMessages(msg))

        // Pega mensagem enviada
        socket.on('chat message', msg => {
            setMessages([...messages, msg])
            setScroll(true)
        })

        setSocket(socket)

        return () => {
            socket.off('messages')
            socket.off('chat message')
        }
    }, [messages])

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    const sendMessage = () => {
        if (!isAuthenticated) {
            toast({
                description: 'Você precisa logar antes de usar o chat',
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            return
        }

        if (msg !== '') {
            // Envia mensagem
            socket.emit('chat message', { token: isAuthenticated, msg })
            setMsg('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    const handleScroll = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }

    return (
        <Center mt={3}>
            <Grid position={'relative'} templateRows={'repeat(5, 1fr)'} w={{
                base: '90%',
                sm: '40%',
                md: '90%',
                lg: '50%'
            }} h={{
                base: '50vh',
                lg: '55vh'
            }} p={3} border={'1px'} borderColor={'gray.200'} borderRadius={'md'}>
                <GridItem ref={chatRef} overflowY={'auto'} rowStart={1} rowEnd={5}>
                    {scroll && <IconButton onClick={handleScroll} position={'absolute'} width={'10px'} borderRadius={'md'} top={'70%'} left={'48%'} icon={<ArrowDownIcon />} />}
                    {messages.map((msg, i) => (
                        <Box key={i} px={3}>
                            <div>
                                <span style={{ fontSize: 'xl', fontWeight: 'bold' }}>{isAuthenticated === msg.token ? 'Você' : msg.user.username}</span>
                                <p style={{ fontSize: 'md' }}>{msg.text}</p>
                                <div style={{ fontSize: 'sm' }}>{formatTimestamp(msg.createdAt)}</div>
                            </div>
                        </Box>
                    ))}
                </GridItem>
                <GridItem alignSelf={'end'}>
                    <InputGroup>
                        <Input onKeyDown={handleKeyDown} value={msg} onChange={(e) => setMsg(e.target.value)} type='text' placeholder='Escreva sua mensagem' />
                        <InputRightElement>
                            <IconButton borderTopLeftRadius={0} borderBottomLeftRadius={0} borderTopRightRadius={5} borderBottomRightRadius={5} onClick={sendMessage} icon={<ArrowUpIcon />}>
                            </IconButton>
                        </InputRightElement>
                    </InputGroup>
                </GridItem>
            </Grid>
        </Center>
    )
}

export default Chat