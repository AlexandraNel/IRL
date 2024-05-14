import { Col, Container, Row } from "react-bootstrap";
import Hero2 from "../../assets/tennisshadows.jpg";
import Image from "react-bootstrap/Image";
import "./about.css";


// page column size adapts to screen size

const About = () => {
  return (
    <Container bsPrefix="noGutters">
      <Row className="g-0 aboutRow">

        <Col sm={12} md={4}>
          <Image src={Hero2} fluid className="aboutImg" />
        </Col>

        <Col sm={12} md={8}>
          <p className="aboutText">
            <strong>Welcome to IRL, the dating app that brings connections to
            life&mdash;literally. In a world dominated by screens, endless
            swiping, and increasing depersonalisation, IRL stands out by
            encouraging you to get out and truly live.</strong>
          </p>

          <p className="aboutText">
            Our mission is simple: to facilitate meaningful connections based on
            shared interests and real-world experiences. <strong>With IRL, you can match
            with people who are not just looking for a date, but are also eager
            to explore and enjoy group activities, friend dates, and one-on-one
            romantic outings.</strong> Whether it&apos;s attending a concert, joining a
            cooking class, or hiking a scenic trail, our app connects you with
            individuals who share your passions and want to make memories beyond
            the virtual realm.
          </p>
          
          <p className="aboutText">
            We believe that the best relationships start with a great story, and
            what better way to create those stories than by pinning an event, or
            adventure, and finding your match? Or browse the list of activities
            that potential matches have posted? With IRL, you&apos;re one step
            closer to meeting interesting people, engaging in exciting events,
            and making genuine connections that go beyond the screen. <strong>Because in
            the end, the best way to know someone is to meet them&mdash;In Real
            Life.</strong>
          </p>

        </Col>

      </Row>

    </Container>
  );
};

export default About;
