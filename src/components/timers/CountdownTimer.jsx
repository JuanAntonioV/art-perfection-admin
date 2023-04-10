import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const CountdownTimer = ({ timer, resendAction }) => {
    const [date, setDate] = useState(timer ?? Date.now() + 59000);
    const [reset, setReset] = useState(0);

    const handleResend = () => {
        setReset(reset + 1);
        setDate(Date.now() + 59000);
        resendAction();
    };

    const Completionist = () => {
        return (
            <Flex align={'center'} justify={'start'} gap={1}>
                <Text fontSize={'sm'} color={'gray.600'}>
                    Belum menerima email?
                </Text>
                <Button
                    size={'sm'}
                    colorScheme={'blue'}
                    variant={'link'}
                    fontWeight={'normal'}
                    onClick={handleResend}
                >
                    Resend
                </Button>
            </Flex>
        );
    };

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <Text fontSize={'sm'} color={'gray.600'}>
                    Mengirim ulang kembali dalam {zeroPad(minutes)}:
                    {zeroPad(seconds)}
                </Text>
            );
        }
    };

    return <Countdown key={reset} date={date} renderer={renderer} />;
};

export default CountdownTimer;
