import React from 'react';
import { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import { Heading, Highlight, Box } from '@chakra-ui/react';
import { baseUrlSocket } from '../utils';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import Nav from '../components/Nav';
import DepositHistory from '../components/DepositHistory';
import io from 'socket.io-client';

function Home() {
    const [amount, setAmount] = useState(null);
    const socket = io(baseUrlSocket);

    useEffect(() => {
        socket.emit('total amount', {});
        socket.on('total amount', ta => {
            if (ta) {
                setAmount(ta);
            }
        });
    }, []);

    socket.on('total amount', ta => {
        setAmount(ta);
    });

    return (
        <>
            <Nav />

            <Box mt={10}>
                <Heading mb={5} size={'4xl'} textAlign={'center'}>
                    <Highlight
                        query={useCurrencyFormatter(amount)}
                        styles={{ borderRadius: 'md', px: '5', color: 'green', bg: 'green.100' }}
                    >
                        {useCurrencyFormatter(amount)}
                    </Highlight>
                </Heading>
                <Timer />
            </Box>

            <DepositHistory />
        </>
    );
}

export default Home;
