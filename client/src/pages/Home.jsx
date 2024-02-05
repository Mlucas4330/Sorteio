import React from 'react';
import { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import Timer from '../components/Timer';
import { Heading, Highlight, Box } from '@chakra-ui/react';
import { fetchData } from '../utils';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import Nav from '../components/Nav';
import DepositHistory from '../components/DepositHistory';

function Home() {
    const [amount, setAmount] = useState('');

    const handlePrizedraw = async () => {
        try {
            const { data, code } = await fetchData('prizedraw');

            if (code === 200) {
                setAmount(useCurrencyFormatter(data.totalAmount));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handlePrizedraw();
    }, []);

    return (
        <>
            <Nav />

            <Box mt={10}>
                <Heading mb={5} size={'4xl'} textAlign={'center'}>
                    <Highlight query={amount} styles={{ borderRadius: 'md', px: '5', color: 'green', bg: 'green.100' }}>
                        {amount}
                    </Highlight>
                </Heading>
                <Timer />
            </Box>

            <DepositHistory />
        </>
    );
}

export default Home;
