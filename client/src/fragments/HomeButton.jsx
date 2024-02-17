import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const HomeButton = () => {
    return (
        <Link to={'/'}>
            <Button m={7} colorScheme="yellow">
                Voltar
            </Button>
        </Link>
    )
}

export default HomeButton
