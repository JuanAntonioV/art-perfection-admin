import { Grid, Stack } from '@chakra-ui/react';
import DetailEmployee from './partials/DetailEmployee';
import ChangeEmployeePassword from './partials/ChangeEmployeePassword';
import EmployeeAnalytics from './partials/EmployeeAnalytics';
import PermissionMiddleware from '@/routes/middleware/PermissionMiddleware';
import VoteSection from '../dashboard/partials/VoteSection';

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
                <PermissionMiddleware
                    roleKeyException={'admin'}
                    permisionKey={'view employee vote section'}
                >
                    <VoteSection />
                </PermissionMiddleware>
                <DetailEmployee />

                <PermissionMiddleware
                    permisionKey={'view employee change password'}
                >
                    <ChangeEmployeePassword />
                </PermissionMiddleware>
            </Grid>

            <PermissionMiddleware permisionKey={'view employee activities'}>
                <EmployeeAnalytics />
            </PermissionMiddleware>
        </Stack>
    );
};

export default EmployeDetailPage;
