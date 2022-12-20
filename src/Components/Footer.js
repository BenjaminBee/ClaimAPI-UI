import { Container, Navbar} from 'react-bootstrap';
import '../styling/footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <Navbar className="footer" expand="lg" fixed="bottom" padding="20px">
      <Container>
        <div>
          <FaFacebook className='footerIcons'/>
          <FaInstagram className='footerIcons'/>
          <FaTwitter className='footerIcons'/>
          <FaRegEnvelope className='footerIcons'/>
        </div>
        <div>
          <a className='copyright' href='https://Pingsurance.com/'>
            © 2022 Copyright: Pingsurance.com
          </a>
        </div>
      </Container>
    </Navbar>
  );
}