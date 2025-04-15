import React from 'react'

function Hero() {
  return (
    <div className="carousel w-full carousel-loop">
    <div id="slide1" className="carousel-item relative w-full">
      <img
        src="https://img.freepik.com/free-photo/zero-waste-beauty-products_23-2149304150.jpg?t=st=1744738688~exp=1744742288~hmac=481bb1f63745067d88e652561da85da071876472c89a5a9e429766ea70edcc99&w=996"
        className="w-full h-[500px]"
      />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full">
      <img
        src="https://img.freepik.com/free-vector/makeup-cosmetics-accessories-shelf-realistic-image_1284-9312.jpg?t=st=1744738803~exp=1744742403~hmac=5b664626419c1185aae75bc18e9d03b711eed4a01c7c9843ad9861a9aeafbc60&w=826"
        className="w-full h-[500px]"
      />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide3" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full">
      <img
        src="https://img.freepik.com/free-photo/gua-sha-care-products-arrangement_23-2149322589.jpg?t=st=1744738622~exp=1744742222~hmac=5b1dd4697bbfabb37cb3a1ef8b74dd96aa4b6ab667a044722be3a3b0a8422a59&w=996"
        className="w-full h-[500px]"
      />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide1" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  </div>
  )
}
export default Hero;