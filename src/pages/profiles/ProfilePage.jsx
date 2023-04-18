import { Grid } from '@chakra-ui/react';
import ChangePassword from './partials/ChangePassword';
import ChangeProfile from './partials/ChangeProfile';

const ProfilePage = () => {
    return (
        <Grid
            templateColumns={{
                base: '1fr',
                md: '1fr 1fr',
            }}
            gap={4}
        >
            <ChangeProfile />
            <ChangePassword />
        </Grid>
    );
};

export default ProfilePage;
