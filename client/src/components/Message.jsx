import { Box, Text } from '@chakra-ui/react';
import useTimeFormatter from '../hooks/useTimeFormatter';

const Message = ({ data, token }) => {
    return (
        <Box>
            <Text as={'b'}>{token === data.token ? 'Você' : data.user.username}</Text>
            <Text as={'p'}>{data.text}</Text>
            <Text as={'span'} color={'gray.400'}>
                {useTimeFormatter(data.createdAt)}
            </Text>
        </Box>
    );
};

export default Message;
