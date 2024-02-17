import { Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Timer() {
    const [time, setTime] = useState(null)

    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)

    useEffect(() => {
        setInterval(() => {
            const now = new Date()

            const timeDifference = midnight.getTime() - now.getTime()

            const hours = Math.floor(timeDifference / (1000 * 60 * 60))
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

            const timeLeft = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
                seconds < 10 ? '0' + seconds : seconds
            }`

            setTime(timeLeft)
        }, 1000)
    }, [])

    return (
        <Heading fontWeight={'500'} color={'red.500'} size={'md'} textAlign={'center'}>
            Tempo restante: {time}
        </Heading>
    )
}

export default Timer
