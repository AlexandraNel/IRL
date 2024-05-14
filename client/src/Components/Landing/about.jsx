import { Col, Container, Row } from "react-bootstrap";
import Hero2 from "../../assets/tennisshadows.jpg";
import Image from "react-bootstrap/Image";
import "./about.css";

// page column size adapts to screen size

const About = () => {
  return (
    <Container >
      <Row>
        <Col xs={12} sm={4} className="text-center">
          <Image src={Hero2} fluid className="aboutImg" />
        </Col>
        <Col xs={12} sm={8}>
        <p className="aboutText">
            Welcome to IRL, the dating app that brings connections to
            life&mdash;literally. In a world dominated by screens, endless swiping,
            and increasing depersonalisation, IRL stands out by encouraging you
            to get out and truly live. <br />
            Our mission is simple: to facilitate meaningful connections based on
            shared interests and real-world experiences. With IRL, you can match
            with people who are not just looking for a date, but are also eager
            to explore and enjoy group activities, friend dates, and one-on-one
            romantic outings. Whether it&apos;s attending a concert, joining a
            cooking class, or hiking a scenic trail, our app connects you with
            individuals who share your passions and want to make memories beyond
            the virtual realm. <br />
            We believe that the best relationships start with a great story, and
            what better way to create those stories than by posting an event, or
            adventure, and finding your match? Or browse the list of activities
            that potential matches have posted? With IRL, you&apos;re one step closer
            to meeting interesting people, engaging in exciting events, and
            making genuine connections that go beyond the screen. Because in the
            end, the best way to know someone is to meet them&mdash;In Real Life.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
