import { Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function Timer(){
    const [time, setTime] = useState(null)

    const getTime = () => {
        const now = new Date()
        const midnight = new Date()
        midnight.setHours(24, 0, 0, 0)

        const timeDifference = midnight.getTime() - now.getTime()

        const hours = Math.floor(timeDifference / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        const timeLeft = `${hours< 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

        setTime(timeLeft)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getTime()
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <Heading textAlign={'center'}>{time}</Heading>
    )
}

export default Timer