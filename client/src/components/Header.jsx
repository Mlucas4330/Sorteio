import { useEffect } from 'react'
import { ArrowBackIcon, ChevronRightIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import { Flex, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Box } from '@chakra-ui/react'
import UserModal from './UserModal'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
    const [token, setToken] = useState()
    const { onOpen, isOpen, onClose } = useDisclosure()

    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
    }, [])

    const signout = () => {
        localStorage.removeItem('token')
        setToken('')
    }

    return (
        <>
            {token && <UserModal isOpen={isOpen} onClose={onClose} />}
            <header>
                <Flex justify={'end'}>
                    <Box mt={
                        {
                            base: 5,
                            sm: 10,
                            md: 10
                        }} mr={{
                            base: 5,
                            sm: 5,
                            md: 10
                        }}>
                        <Menu>
                            <MenuButton as={Button} leftIcon={<HamburgerIcon />}>
                                Ações
                            </MenuButton>
                            <MenuList>
                                {
                                    token ?
                                        <>
                                            <MenuItem onClick={onOpen} icon={<SettingsIcon />}>
                                                Configurações
                                            </MenuItem>
                                            <MenuItem onClick={signout} icon={<ArrowBackIcon />}>
                                                Sair
                                            </MenuItem>
                                        </>
                                        :
                                        <Link to="/signin">
                                            <MenuItem icon={<ChevronRightIcon />}>
                                                Entrar
                                            </MenuItem>
                                        </Link>
                                }
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </header>
        </>
    )
}

export default Header