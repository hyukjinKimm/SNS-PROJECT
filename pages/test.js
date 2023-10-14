import React from "react";
import Slider from "react-slick";

const data = [
  "https://media.istockphoto.com/id/1446806057/photo/young-happy-woman-student-using-laptop-watching-webinar-writing-at-home.jpg?s=2048x2048&w=is&k=20&c=cJi6VhUnXMYkka0ktIcrH3uh1Ls90M5FnfYYtCcqSi0=",
  "./assets/2.jpg",
  "./assets/3.jpg",
];
const settings = {
  cssEase: "linear",
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ImageSlider = () => {
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
      <div style={{ width: "40vw" }}>
        <Slider {...settings}>
          {data.map((item) => (
            <div>
              <img src={item} alt="" style={{ width: "100%", height: "50%" }} />
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
