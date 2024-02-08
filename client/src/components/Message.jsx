import { Avatar, Box, Flex, Grid, Text } from '@chakra-ui/react';
import useTimeFormatter from '../hooks/useTimeFormatter';
import useBlobToImage from '../hooks/useBlobToImage';

const Message = ({ data, token }) => {
    const me = token === data.token;

    return (
        <Flex mb={5} align={'center'} gap={5} justify={me ? 'end' : 'start'} flexDirection={me ? 'row-reverse' : 'row'}>
            <Grid>
                <Avatar src={useBlobToImage(data.user.image)} />
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
