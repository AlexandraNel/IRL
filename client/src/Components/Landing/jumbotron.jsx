import hero from "../../assets/Landing.png";
import Image from 'react-bootstrap/Image';

function Jumbotron() {
    
  return (
    <div className="text-center">
    <Image src={hero} fluid className="w-100 mx-auto" />
  </div>)
}

export default Jumbotron;