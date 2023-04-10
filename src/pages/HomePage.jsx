import { useSelector } from 'react-redux';

const HomePage = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div>
            <h1>HOME PAGE</h1>
            <p>{auth.user.name}</p>
        </div>
    );
};

export default HomePage;
