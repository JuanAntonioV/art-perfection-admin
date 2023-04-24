import { Grid, Stack } from '@chakra-ui/react';
import DetailEmployee from './partials/DetailEmployee';
import ChangeEmployeePassword from './partials/ChangeEmployeePassword';
import EmployeeAnalytics from './partials/EmployeeAnalytics';

const EmployeDetailPage = () => {
    return (
        <Stack spacing={8}>
            <Grid
                templateColumns={{
                    base: '1fr',
                    md: '1fr 1fr',
                }}
                gap={4}
            >
                <DetailEmployee />

                <ChangeEmployeePassword />
            </Grid>

            <EmployeeAnalytics />
        </Stack>
    );
};

export default EmployeDetailPage;
