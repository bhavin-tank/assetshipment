import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";

const Home = () => {
    const { isSignedIn, user } = useSelector((store) => store.auth);
    return (
        <Container className='my-5 py-5'>
            <h1 className="text-center text-white"> {isSignedIn ? user?.displayName + ', ' || 'ABC XYZ, ' : ''}Welcome to the Altimetrik</h1>
        </Container>
    )
};

export default Home;