import { Container } from "react-bootstrap";
import Jumbotron from "../Components/Landing/jumbotron";
import JoinForm from "../Components/Landing/join";
import MyCarousel from "../Components/Landing/carousel";
import About from "../Components/Landing/about";
import MyProfile from "./MyProfile";
import Auth from "../../Utils/auth";
import "../index.css"

function Landing() {
  console.log("Landing component rendered");
  const loggedIn = Auth.loggedIn();
  console.log("User logged in:", loggedIn);

  if (loggedIn) {
    return (
      <Container fluid bsPrefix="noGutters">
        <MyProfile />
      </Container>
    );
  } else {
    return (
      <Container fluid bsPrefix="noGutters">
        <Jumbotron />
        <About />
        <JoinForm />
        <MyCarousel />
      </Container>
    );
  }
}

export default Landing;
