import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { currencyFormatter, socket } from '../utils'
import React, { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData'

const LastWinner = () => {
    const [lastWinner, setLastWinner] = useState(null)

    const getLastWinner = async () => {
        const { data, code } = await useFetchData('last-winner')

        if (code === 200) {
            setLastWinner(data)
        }
    }

    useEffect(() => {
        getLastWinner()
    }, [])

    socket.on('last winner', lw => {
        setLastWinner(lw)
    })

    return lastWinner ? (
        <Box>
            <Heading fontWeight={'500'} size={'md'} textAlign={'center'} color={'gray.400'}>
                Último vencedor
            </Heading>
            <Card mt={6}>
                <CardBody>
                    <Text as={'b'}>{lastWinner.username}</Text>
                    <Heading size={'2xl'} color="green">
                        {currencyFormatter(lastWinner.totalAmount)}
                    </Heading>
                </CardBody>
            </Card>
        </Box>
    ) : null
}

export default LastWinner
