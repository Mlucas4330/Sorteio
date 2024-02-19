import {
    Card,
    CardBody,
    Box,
    Flex,
    Heading,
    IconButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VisuallyHidden,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { currencyFormatter, socket, timeFormatter } from '../utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import useFetchData from '../hooks/useFetchData'

const DepositHistory = () => {
    const [deposits, setDeposits] = useState([])
    const [tabIndex, setTabIndex] = useState(0)

    const getDeposits = async () => {
        const { data, code } = await useFetchData('deposits')

        if (code === 200) {
            setDeposits(data.deposits)
        }
    }

    useEffect(() => {
        getDeposits()

        socket.on('deposit', dpt => {
            setDeposits([...deposits, JSON.parse(dpt)])
        })
    }, [])

    const handleClick = direction => {
        if (direction === 'next') {
            if (deposits.length - 1 > tabIndex) {
                setTabIndex(tabIndex + 1)
            }
        }

        if (direction === 'prev') {
            if (tabIndex > 0) {
                setTabIndex(tabIndex - 1)
            }
        }
    }

    return deposits.length > 0 ? (
        <Box maxW={'3xl'}>
            <Heading fontWeight={'500'} size={'md'} textAlign={'center'} color={'gray.400'}>
                Últimos pix
            </Heading>

            <Flex align={'center'} justify={'center'}>
                <IconButton icon={<ArrowLeftIcon />} onClick={() => handleClick('prev')}>
                    Anterior
                </IconButton>
                <Tabs index={tabIndex}>
                    <TabPanels>
                        {deposits.map(deposit => (
                            <TabPanel key={deposit.id}>
                                <Card m={3}>
                                    <CardBody>
                                        <Text as={'b'}>{deposit.user.username}</Text>
                                        <Heading size={'2xl'} color='green'>
                                            {currencyFormatter(deposit.amount)}
                                        </Heading>
                                        <Text color={'gray.500'} fontWeight={'400'}>
                                            {timeFormatter(deposit.createdAt)}
                                        </Text>
                                    </CardBody>
                                </Card>
                            </TabPanel>
                        ))}
                    </TabPanels>

                    <VisuallyHidden>
                        <TabList>
                            {deposits.map((deposit, i) => (
                                <Tab key={i}></Tab>
                            ))}
                        </TabList>
                    </VisuallyHidden>
                </Tabs>
                <IconButton icon={<ArrowRightIcon />} onClick={() => handleClick('next')}>
                    Próximo
                </IconButton>
            </Flex>
        </Box>
    ) : null
}

export default DepositHistory
