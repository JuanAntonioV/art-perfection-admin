import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import Wrapper from '@/components/wrappers/Wrapper';
import {
    getGlobalAnalytics,
    getUserAnalytics,
} from '@/stores/thunks/analyticsThunk';
import { getUser } from '@/stores/thunks/authThunk';
import { checkHeadCanVote, createVote } from '@/stores/thunks/voteThunk';
import {
    Box,
    Button,
    Flex,
    FormLabel,
    Radio,
    RadioGroup,
    SkeletonText,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const VoteSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        user,
        token,
        status: authStatus,
    } = useSelector((state) => state.auth);
    const { status: voteStatus } = useSelector((state) => state.vote);
    const { id: userId } = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [canVote, setCanVote] = useState(false); // user?.can_vote
    const [kehadiran, setKehadiran] = useState(1);
    const [kedisiplinan, setKedisiplinan] = useState(1);
    const [kemandirian, setKemandirian] = useState(1);
    const [menerimaSaran, setMenerimaSaran] = useState(1);
    const [ketepatanKerja, setKetepatanKerja] = useState(1);
    const [progressKerja, setProgressKerja] = useState(1);

    useEffect(() => {
        if (user?.role === 'employee') {
            user?.can_vote ? setCanVote(true) : setCanVote(false);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onOpen();
    };

    useEffect(() => {
        if (user?.role === 'head') {
            const payload = {
                user_id: userId,
                head_id: user?.id,
                token: token,
            };

            if (user) {
                dispatch(checkHeadCanVote(payload)).then((res) => {
                    setCanVote(res.payload.data?.can_vote_user);
                });
            }
        }
    }, [userId, user]);

    const handlePostVote = () => {
        // get the today date in Indonesia with format yyyy-mm-dd
        const toDayDate = new Date().toLocaleDateString('id-ID');

        // make toDayDate format to 2023-01-01
        const toDayDateString = toDayDate
            .split('/')
            .reverse()
            .join('-')
            .replace('/', '-');

        // if the date is 1-9, make it to 01-09
        const toDayDateFormatted =
            toDayDateString.length === 9
                ? toDayDateString.replace('-', '-0')
                : toDayDateString;

        const payload = {
            // if user is employee, get the user id from user, else get the user id from url params
            user_id: user?.role === 'employee' ? user?.id : userId,
            token: token,
            vote_date: toDayDateFormatted,
            votes: [
                {
                    criteria_id: 1,
                    score: kehadiran,
                },
                {
                    criteria_id: 2,
                    score: kedisiplinan,
                },
                {
                    criteria_id: 3,
                    score: kemandirian,
                },
                {
                    criteria_id: 4,
                    score: menerimaSaran,
                },
                {
                    criteria_id: 5,
                    score: ketepatanKerja,
                },
                {
                    criteria_id: 6,
                    score: progressKerja,
                },
            ],
        };

        dispatch(createVote(payload)).then((res) => {
            onClose();
            // dispatch(getGlobalAnalytics(token));
            setKehadiran(1);
            setKedisiplinan(1);
            setKemandirian(1);
            setMenerimaSaran(1);
            setKetepatanKerja(1);
            setProgressKerja(1);
            setCanVote(false);

            if (user?.role === 'employee') {
                const payloadAnalyticsUser = {
                    id: user?.id,
                    token: token,
                };

                dispatch(getUserAnalytics(payloadAnalyticsUser));
                dispatch(getUser(token));
            }

            if (user?.role === 'head') {
                const payloadHeadCanVote = {
                    user_id: userId,
                    head_id: user?.id,
                    token: token,
                };

                const payloadAnalyticsHead = {
                    id: userId,
                    token: token,
                };

                navigate('/anggota');
                dispatch(getUserAnalytics(payloadAnalyticsHead));
                dispatch(checkHeadCanVote(payloadHeadCanVote));
            }
        });
    };

    return (
        <>
            <AlertDeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                title={'Submit Vote'}
                detail={
                    'Apakah anda yakin ingin submit vote ini? Vote tidak dapat diubah kembali.'
                }
                btnText={'Submit'}
                btnColor={'blue'}
                action={handlePostVote}
            />

            <Wrapper
                title={'Vote'}
                description={
                    'Menu ini berisi informasi mengenai vote yang ada pada votes system.'
                }
            >
                {user ? (
                    <form onSubmit={handleSubmit}>
                        {canVote ? (
                            <Stack spacing={8}>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Kehadiran
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='kehadiran'
                                            onChange={(value) =>
                                                setKehadiran(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Kedisiplinan
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='kedisiplinan'
                                            onChange={(value) =>
                                                setKedisiplinan(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Kemandirian Kerja
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='kemandirian'
                                            onChange={(value) =>
                                                setKemandirian(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Menerima Saran
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='menerimaSaran'
                                            onChange={(value) =>
                                                setMenerimaSaran(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Ketepatan Kerja
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='ketepatanKerja'
                                            onChange={(value) =>
                                                setKetepatanKerja(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>
                                <Stack spacing={3}>
                                    <FormLabel m={0} fontWeight={'bold'}>
                                        Progress Kerja
                                    </FormLabel>
                                    <SkeletonText
                                        isLoaded={authStatus === 'success'}
                                    >
                                        <RadioGroup
                                            defaultValue='1'
                                            name='progressKerja'
                                            onChange={(value) =>
                                                setProgressKerja(value)
                                            }
                                        >
                                            <Flex
                                                gap={2}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                            >
                                                <Radio
                                                    colorScheme='red'
                                                    value='1'
                                                >
                                                    Sangat Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='red'
                                                    value='2'
                                                >
                                                    Tidak Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='blue'
                                                    value='3'
                                                >
                                                    Sesuai
                                                </Radio>
                                                <Radio
                                                    colorScheme='green'
                                                    value='4'
                                                >
                                                    Sangat Sesuai
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </SkeletonText>
                                </Stack>

                                <Flex justifyContent={'end'}>
                                    <Button
                                        type='submit'
                                        colorScheme='blue'
                                        rightIcon={<IoSend />}
                                    >
                                        Kirim
                                    </Button>
                                </Flex>
                            </Stack>
                        ) : (
                            <SkeletonText
                                isLoaded={
                                    authStatus === 'success' ||
                                    (user?.role === 'head' &&
                                        voteStatus === 'success')
                                }
                            >
                                <Stack spacing={1}>
                                    <Text
                                        fontWeight={'bold'}
                                        textColor={'blue.500'}
                                    >
                                        Terima kasih telah memberikan penilaian!
                                    </Text>

                                    <Text
                                        fontSize={'sm'}
                                        textColor={'gray.400'}
                                    >
                                        Silahkan kembali ke halaman ini pada
                                        hari berikutnya.
                                    </Text>
                                </Stack>
                            </SkeletonText>
                        )}
                    </form>
                ) : (
                    <SkeletonText
                        isLoaded={
                            (user && authStatus === 'success') ||
                            (user?.role === 'head' && voteStatus === 'success')
                        }
                    />
                )}
            </Wrapper>
        </>
    );
};

export default VoteSection;
