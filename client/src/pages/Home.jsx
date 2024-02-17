import React, { useEffect } from 'react';
import { useState } from 'react';
import Timer from '../components/Timer';
import { Heading, Highlight, Box, Flex, Container } from '@chakra-ui/react';
import { socket } from '../utils';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import Nav from '../components/Nav';
import DepositHistory from '../components/DepositHistory';
import LastWinner from '../components/LastWinner';
import useFetchData from '../hooks/useFetchData';

function Home() {
    const [amount, setAmount] = useState(null);

    const getTotalAmount = async () => {
        try {
            const { data, code } = await useFetchData('total-amount');

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
        setAmount(Number(amount) + Number(data));
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

            <Container mt={10} maxW={'3xl'}>
                <Flex justify={'space-around'}>
                    <DepositHistory />
                    <LastWinner />
                </Flex>
            </Container>
        </>
    );
}

export default Home;
