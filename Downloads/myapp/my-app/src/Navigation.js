import { Navbar, Nav, Container } from "react-bootstrap"
import './ShowData.css'
const  Navigation =()=>{
    return(
            <>
                <Navbar expand="sm" bg="primary" variant="dark">
                    <Container>
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/showdata">UserList</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
    )
};
export default Navigation;