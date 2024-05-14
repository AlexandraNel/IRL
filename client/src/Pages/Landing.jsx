import { Container } from "react-bootstrap";
import Jumbotron from "../Components/Landing/jumbotron";
import JoinForm from "../Components/Landing/join";
import MyCarousel from "../Components/Landing/carousel";
import About from "../Components/Landing/about";
import MyProfile from "./MyProfile";
import Auth from "../../Utils/auth";

function Landing() {
 
    if (Auth.loggedIn()) {
      return (
        <Container fluid>
          <MyProfile />
        </Container>
      );

    } else {

      return (
        <Container fluid>
          <Jumbotron />
          <About />
          <JoinForm />
          <MyCarousel />
        </Container>
      );
    }
  }


export default Landing;
