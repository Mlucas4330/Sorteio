import React, { useEffect, useState } from 'react'
import { AddIcon, ArrowBackIcon, ChatIcon, ChevronRightIcon, HamburgerIcon, QuestionOutlineIcon, SettingsIcon } from '@chakra-ui/icons'
import { Flex, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, ButtonGroup } from '@chakra-ui/react'
import UserModal from './UserModal'
import { Link, useNavigate } from 'react-router-dom'
import { destroyToken, getToken } from '../utils'
import DepositModal from './DepositModal'
import Chat from './Chat'

function Nav() {
    const [token, setToken] = useState()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { onOpen: onOpenDeposit, isOpen: isOpenDeposit, onClose: onCloseDeposit } = useDisclosure()
    const { onOpen: onOpenChat, isOpen: isOpenChat, onClose: onCloseChat } = useDisclosure()
    const navigate = useNavigate()

    useEffect(() => {
        setToken(getToken())
    }, [])

    const signout = () => {
        navigate(0)
        setToken(destroyToken())
    }

    return (
        <>
            <DepositModal isOpen={isOpenDeposit} onClose={onCloseDeposit} />
            <Chat isOpen={isOpenChat} onClose={onCloseChat} />
            {token && <UserModal isOpen={isOpen} onClose={onClose} />}

            <Flex p={7} as={'header'} justify={'space-between'}>
                <ButtonGroup>
                    <Button leftIcon={<AddIcon />} onClick={onOpenDeposit} colorScheme="green">
                        Depositar
                    </Button>
                    <Button leftIcon={<ChatIcon />} onClick={onOpenChat}>
                        Chat
                    </Button>
                </ButtonGroup>

                <Menu>
                    <MenuButton as={Button} leftIcon={<HamburgerIcon />}>
                        Ações
                    </MenuButton>
                    <MenuList>
                        {token ? (
                            <>
                                <MenuItem onClick={onOpen} icon={<SettingsIcon />}>
                                    Configurações
                                </MenuItem>
                                <Link to={'/tutorial'}>
                                    <MenuItem icon={<QuestionOutlineIcon />}>Como funciona</MenuItem>
                                </Link>
                                <MenuItem onClick={signout} icon={<ArrowBackIcon />}>
                                    Sair
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <MenuItem icon={<ChevronRightIcon />}>Entrar</MenuItem>
                                </Link>
                                <Link to={'/tutorial'}>
                                    <MenuItem icon={<QuestionOutlineIcon />}>Como funciona</MenuItem>
                                </Link>
                            </>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
        </>
    )
}

export default Nav
