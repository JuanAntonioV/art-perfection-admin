import { Grid, Stack } from '@chakra-ui/react';
import ChangeHeadPassword from './partials/ChangeHeadPassword';
import DetailHead from './partials/DetailHead';

const HeadDetailPage = () => {
    return (
        <Stack spacing={8}>
            <Grid
                templateColumns={{
                    base: '1fr',
                    md: '1fr 1fr',
                }}
                gap={4}
            >
                <DetailHead />

                <ChangeHeadPassword />
            </Grid>
        </Stack>
    );
};

export default HeadDetailPage;
