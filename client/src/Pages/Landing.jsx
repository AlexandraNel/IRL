import { Container, Row, Col } from 'react-bootstrap';
import Landing from "../assets/Landing.png";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Landing = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Landing;
