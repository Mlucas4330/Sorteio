import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Container,
    Divider,
    Heading,
    Text
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

const Tutorial = () => {
    return (
        <>
            <Nav />
            <Link to={'/'}>
                <Button m={7} colorScheme="yellow">
                    Voltar
                </Button>
            </Link>
            <Container maxW={'xl'}>
                <Text>
                    Cada dia, exatamente à meia-noite, um novo sorteio tem início e se estende por 24 horas. Neste intervalo, os usuários
                    têm a oportunidade de adquirir sua participação no sorteio vigente realizando pagamentos por Pix. Além disso, o valor
                    desses pagamentos contribui para o montante total que será sorteado ao final do dia.
                </Text>

                <Heading size={'lg'} mt={5} mb={3} textAlign={'center'}>
                    Dúvidas frequentes
                </Heading>

                <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as={'b'} flex="1" textAlign="left">
                                Quanto mais eu depositar, mais chance eu tenho de ganhar?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <AccordionPanel>Não. Cada usuário é contabilizado somente uma vez, no depósito inicial.</AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as={'b'} flex="1" textAlign="left">
                                Os depósitos tem taxa?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <AccordionPanel>Não. 0% de taxa, ao depositar, esse é o valor real que contribuirá ao montante.</AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
        </>
    );
};

export default Tutorial;
