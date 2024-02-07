import { Container, Heading, Highlight, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { baseUrlSocket } from '../utils';
import useTimeFormatter from '../hooks/useTimeFormatter';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import io from 'socket.io-client';

const DepositHistory = () => {
    const [deposits, setDeposits] = useState([]);
    const socket = io(baseUrlSocket);

    useEffect(() => {
        socket.emit('deposits', {});
        socket.on('deposits', deposits => {
            if (deposits) {
                setDeposits(deposits);
            }
        });
    }, []);

    socket.on('deposit', dpt => {
        setDeposits([...deposits, dpt]);
    });

    return (
        <Container maxW={'3xl'}>
            <Heading fontWeight={'500'} size={'md'} textAlign={'center'} mt={10} color={'gray.400'}>
                Últimos pix
            </Heading>
            <Table mt={3} variant={'simple'} borderWidth={1} p={5}>
                <Thead>
                    <Tr>
                        <Th>Usuário</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {deposits.length > 0 &&
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
