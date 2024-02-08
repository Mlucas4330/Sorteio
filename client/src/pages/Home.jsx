import React, { useEffect } from 'react';
import { useState } from 'react';
import Timer from '../components/Timer';
import { Heading, Highlight, Box } from '@chakra-ui/react';
import { fetchData, socket } from '../utils';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import Nav from '../components/Nav';
import DepositHistory from '../components/DepositHistory';

function Home() {
    const [amount, setAmount] = useState(null);

    const getTotalAmount = async () => {
        try {
            const { data, code } = await fetchData('total-amount');

            if (code === 200) {
                setAmount(data.totalAmount);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTotalAmount();
    }, []);

    socket.on('total amount', data => {
        setAmount(amount + data);
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
