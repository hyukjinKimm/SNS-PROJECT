import React from "react";
import Slider from "react-slick";

const settings = {
  cssEase: "linear",
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ImageSlider = ({ images }) => {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div style={{ width: "30vw" }}>
        <Slider {...settings}>
          {images.map((image) => (
            <div>
              <img
                src={`http://localhost:3065/img/${image.src}`}
                alt=""
                style={{ width: "100%", height: "50%" }}
              />
            </div>
          ))}
          {/* <div>
            <img src="https://oxeenit.com/wilderness2/wp-content/uploads/2021/01/video.jpg" />
          </div>
          <div>
            <img src="https://oxeenit.com/wilderness2/wp-content/uploads/2021/01/video.jpg" />
          </div>
          <div>
            <img src="https://oxeenit.com/wilderness2/wp-content/uploads/2021/01/video.jpg" />
          </div>
          <div>
            <img src="https://oxeenit.com/wilderness2/wp-content/uploads/2021/01/video.jpg" />
          </div> */}
        </Slider>
      </div>
    </>
  );
};

export default ImageSlider;
