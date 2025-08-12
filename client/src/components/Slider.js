import React, { memo } from 'react'
import SliderTag from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = ({images}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect : true,
        autoplay: true,
        autoplaySpeed: 3000,
      };

  return (
    <div className='SliderTag w-full h-full'>
        <SliderTag {...settings}>
            {images && images.map((item, index) => {
                return (
                    <div key={index} className='bg-black ab h-[400px] flex justify-center'>
                        <img src={item} className='h-full m-auto object-contain'></img>
                    </div>
                )
            })}
        </SliderTag>
    </div>
  )
}

export default memo(Slider)