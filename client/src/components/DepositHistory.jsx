import {
    Card,
    CardBody,
    Container,
    Flex,
    Heading,
    IconButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VisuallyHidden
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchData, socket } from '../utils';
import useTimeFormatter from '../hooks/useTimeFormatter';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const DepositHistory = () => {
    const [deposits, setDeposits] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    const getDeposits = async () => {
        const { data, code } = await fetchData('deposits');

        if (code === 200) {
            setDeposits(data.deposits);
        }
    };

    useEffect(() => {
        getDeposits();
    }, []);

    socket.on('deposit', dpt => {
        setDeposits([...deposits, JSON.parse(dpt)]);
    });

    const handleClick = direction => {
        if (direction === 'next') {
            if (deposits.length - 1 > tabIndex) {
                setTabIndex(tabIndex + 1);
            }
        }

        if (direction === 'prev') {
            if (tabIndex > 0) {
                setTabIndex(tabIndex - 1);
            }
        }
    };

    return (
        <Container maxW={'3xl'}>
            <Heading fontWeight={'500'} size={'md'} textAlign={'center'} mt={10} color={'gray.400'}>
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
                                        <Heading size={'2xl'} color="green">
                                            {useCurrencyFormatter(deposit.amount)}
                                        </Heading>
                                        <Text color={'gray.500'} fontWeight={'400'}>
                                            {useTimeFormatter(deposit.createdAt)}
                                        </Text>
                                    </CardBody>
                                </Card>
                            </TabPanel>
                        ))}
                    </TabPanels>

                    <VisuallyHidden>
                        <TabList>
                            {deposits.map(deposit => (
                                <Tab key={deposit.id}></Tab>
                            ))}
                        </TabList>
                    </VisuallyHidden>
                </Tabs>
                <IconButton icon={<ArrowRightIcon />} onClick={() => handleClick('next')}>
                    Próximo
                </IconButton>
            </Flex>
        </Container>
    );
};

export default DepositHistory;
