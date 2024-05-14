
import image01 from "../../assets/Asianbar.jpg";
import image02 from "../../assets/Bowling01.jpg";
import image03 from "../../assets/coupleinbombers.jpg";
import image04 from "../../assets/foodontable.jpg";
import image05 from "../../assets/bowling2.jpg";
import image06 from "../../assets/cornergirl.jpg";
import image07 from "../../assets/guysatpub.jpg";
import image08 from "../../assets/trivianight.jpg";
import './carousel.css'

const MyCarousel = () => {
  const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
    image08,
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
        {images.map((image, index) => (
          <img key={index + images.length} src={image} alt={`Slide ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
