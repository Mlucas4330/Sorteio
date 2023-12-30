import React from 'react'
import { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import DepositModal from '../components/DepositModal'
import Header from '../components/Header'
import Timer from '../components/Timer'
import { Highlight, Heading } from '@chakra-ui/react'
import { URL } from '../index'

function Home(){
    const [amount, setAmount] = useState('')
    const handlePrizedraw = async () => {
        try {
            const { data } = await fetch(URL + 'amount')

            setAmount(data.amount)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        handlePrizedraw()
    }, [])

    return (
        <>
            <DepositModal />
            <Header />
            <Timer />
            <Heading mt={3} as='h1' size='4xl' noOfLines={1} textAlign={'center'}>
                <Highlight query={`R$ ${amount}`} styles={{ p: 1, bg: 'orange.100' }}>
                    {`R$ ${amount}`} 
                </Highlight>
            </Heading>
            <Chat />
        </>
    )
}

export default Home