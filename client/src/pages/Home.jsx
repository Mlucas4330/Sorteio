import React from 'react'
import { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import DepositModal from '../components/DepositModal'
import Header from '../components/Header'
import Timer from '../components/Timer'
import { Highlight, Heading, Button, useDisclosure, Flex } from '@chakra-ui/react'
import { baseUrl } from '../main'

function Home() {
    const [amount, setAmount] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlePrizedraw = async () => {
        try {
            const { data } = await fetch(baseUrl + 'amount')

            if(data){
                setAmount(data.amount)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handlePrizedraw()
    }, [])

    return (
        <>
            <DepositModal isOpen={isOpen} onClose={onClose} />
            <Header />
            <Timer />
            <Heading mt={3} as='h1' size='4xl' noOfLines={1} textAlign={'center'}>
                <Highlight query={`R$ ${amount}`} styles={{ p: 1, bg: 'orange.100' }}>
                    {`R$ ${amount}`}
                </Highlight>
            </Heading>
            <Chat />
            <Flex justify={{
                base: 'center',
                md: 'center',
                lg: 'start'
            }}>
                <Button
                    ml={{
                        lg: '10'
                    }} mt={5} w={{
                        base: '90%',
                        sm: '90%',
                        lg: '10%'
                    }} colorScheme="green" onClick={onOpen}>
                    Depositar
                </Button>
            </Flex>
        </>
    )
}

export default Home