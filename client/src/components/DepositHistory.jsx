import { Container, Heading, Highlight, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { baseUrlSocket } from '../utils';
import useTimeFormatter from '../hooks/useTimeFormatter';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import io from 'socket.io-client';

const DepositHistory = () => {
    const [deposits, setDeposits] = useState([]);
    const [scroll, setScroll] = useState(false);
    const tableRef = useRef(null);
    const socket = io(baseUrlSocket);

    useEffect(() => {
        socket.emit('deposits', {});
        socket.on('deposits', deposits => setDeposits(deposits));
        setScroll(true);
    }, []);

    socket.on('deposit', dpt => {
        setMessages([...deposits, dpt]);
        setScroll(true);
    });

    const handleScroll = () => {
        tableRef.current.scrollTop = tableRef.current.scrollHeight;
        setScroll(false);
    };

    return (
        <Container maxW={'3xl'}>
            <Heading size={'md'} textAlign={'center'} mt={10} color={'gray.400'}>
                Últimos pix
            </Heading>
            <Table ref={tableRef} variant={'simple'} overflow={'auto'} borderWidth={1} p={5}>
                <Thead>
                    <Tr>
                        <Th>Usuário</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {deposits &&
                        deposits.map(deposit => (
                            <Tr key={deposit.id}>
                                <Td fontWeight={'bold'}>{deposit.user.username}</Td>
                                <Td fontWeight={'bold'}>
                                    <Highlight
                                        query={useCurrencyFormatter(deposit.amount)}
                                        styles={{ borderRadius: 'md', px: '5', color: 'green', bg: 'green.100' }}
                                    >
                                        {useCurrencyFormatter(deposit.amount)}
                                    </Highlight>
                                </Td>
                                <Td color={'blackAlpha.700'}>{useTimeFormatter(deposit.createdAt)}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </Container>
    );
};

export default DepositHistory;
