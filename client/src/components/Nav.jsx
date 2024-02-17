import React, { useEffect, useState } from 'react'
import { AddIcon, ArrowBackIcon, ChatIcon, ChevronRightIcon, HamburgerIcon, QuestionOutlineIcon, SettingsIcon } from '@chakra-ui/icons'
import {
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    ButtonGroup,
    IconButton,
    useBreakpointValue,
    MenuDivider,
} from '@chakra-ui/react'
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
    const isMobile = useBreakpointValue({ base: true, sm: true, md: false })
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

            <Flex
                p={7}
                as={'header'}
                justify={{
                    base: 'end',
                    md: 'space-evenly',
                }}
            >
                {isMobile ? (
                    <Menu>
                        <MenuButton as={IconButton} icon={<HamburgerIcon />} />
                        <MenuList>
                            {token ? (
                                <>
                                    <MenuItem onClick={onOpen} icon={<SettingsIcon />}>
                                        Configurações
                                    </MenuItem>
                                    <MenuItem onClick={signout} icon={<ArrowBackIcon />}>
                                        Sair
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <Link to='/signin'>
                                        <MenuItem icon={<ChevronRightIcon />}>Entrar</MenuItem>
                                    </Link>
                                    <Link to='/signup'>
                                        <MenuItem icon={<ChevronRightIcon />}>Criar Conta</MenuItem>
                                    </Link>
                                </>
                            )}
                            <Link to={'/tutorial'}>
                                <MenuItem icon={<QuestionOutlineIcon />}>Como funciona</MenuItem>
                            </Link>
                            <MenuDivider />
                            <MenuItem icon={<ChatIcon />} onClick={onOpenChat}>
                                Chat
                            </MenuItem>
                            <MenuItem icon={<AddIcon />} onClick={onOpenDeposit}>
                                Depositar
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <>
                        <ButtonGroup>
                            <Button leftIcon={<AddIcon />} onClick={onOpenDeposit} colorScheme='green'>
                                Depositar
                            </Button>
                            <Button leftIcon={<ChatIcon />} onClick={onOpenChat} colorScheme='blue'>
                                Chat
                            </Button>
                        </ButtonGroup>
                        <Link to={'/tutorial'}>
                            <Button leftIcon={<QuestionOutlineIcon />}>Como funciona</Button>
                        </Link>
                        <ButtonGroup>
                            {token ? (
                                <Button colorScheme='red' onClick={signout} leftIcon={<ArrowBackIcon />}>
                                    Sair
                                </Button>
                            ) : (
                                <>
                                    <Link to='/signin'>
                                        <Button icon={<ChevronRightIcon />}>Entrar</Button>
                                    </Link>
                                    <Link to='/signUp'>
                                        <Button icon={<ChevronRightIcon />}>Criar Conta</Button>
                                    </Link>
                                </>
                            )}
                        </ButtonGroup>
                    </>
                )}
            </Flex>
        </>
    )
}

export default Nav
