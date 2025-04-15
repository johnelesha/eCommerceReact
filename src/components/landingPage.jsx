import React from "react";

import Hero from "./Home/Hero"
import Categories from "./Home/Categories"
import Services from "./Home/Services"
import About from "./Home/About"
import Testimonial from "./Home/Testimonial"
import Faq from "./Home/Faq"
import ProductSlider from "./Home/ProductSlider"
import Newsletter from "./Home/Newsletter"

const LandingPage = () => {

    return (
        <div className="space-y-12">
            {/* Need Redesign */}
            <Hero />
            <Services />
            <Categories />
            <ProductSlider />
            <About />
            <Testimonial />
            <Faq />
            <Newsletter />
        </div>
    );
};

export default LandingPage;
