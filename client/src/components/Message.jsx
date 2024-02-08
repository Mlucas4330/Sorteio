import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import useTimeFormatter from '../hooks/useTimeFormatter';
import useBlobToImage from '../hooks/useBlobToImage';
import defaultImage from '../assets/default-profile.png';
import useDecodeToken from '../hooks/useDecodeToken';

const Message = ({ data, token }) => {
    let me = false;

    if (token) {
        const { userId } = useDecodeToken(token);

        me = userId === data.user.id;
    }

    return (
        <Flex mb={5} align={'center'} gap={5} justify={me ? 'end' : 'start'} flexDirection={me ? 'row-reverse' : 'row'}>
            <Grid>
                <Image borderRadius={'full'} src={useBlobToImage(data.user.image) || defaultImage} w={'50px'} h={'50px'} />
                <Text textAlign={'center'} as={'b'}>
                    {me ? 'Você' : data.user.username}
                </Text>
            </Grid>
            <Box>
                <Text textAlign={'center'} borderRadius={'md'} px={3} py={3} boxShadow={'md'} as={'p'}>
                    {data.text}
                </Text>
                <Text textAlign={me ? 'end' : 'start'} color={'gray.300'}>
                    {useTimeFormatter(data.createdAt)}
                </Text>
            </Box>
        </Flex>
    );
};

export default Message;
