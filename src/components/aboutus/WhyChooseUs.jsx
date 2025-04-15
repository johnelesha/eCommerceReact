import { FaTruck, FaLock, FaHeadset, FaTags, FaStar, FaGift } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <>
            <section className="py-16 px-6 md:px-12 bg-base-100 text-base-content">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-5xl font-bold">Why Choose Us?</h2>
                    <p className="text-lg max-w-3xl mx-auto mt-4">
                        We are dedicated to providing the <span className="font-bold italic">best shopping experience</span> with high-quality products and exceptional service.
                        Here’s what sets us apart:
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
                    <div className="card bg-base-200 shadow-lg p-6">
                        <FaTruck className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">Fast Delivery</h3>
                        <p className="text-sm">Quick and reliable shipping to your doorstep.</p>
                    </div>

                    <div className="card bg-base-200 shadow-lg p-6">
                        <FaLock className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">Secure Payments</h3>
                        <p className="text-sm">Safe and trusted payment methods.</p>
                    </div>

                    <div className="card bg-base-200 shadow-lg p-6">
                        <FaHeadset className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">24/7 Support</h3>
                        <p className="text-sm">Personalized assistance for all your queries.</p>
                    </div>

                    <div className="card bg-base-200 shadow-lg p-6 ">
                        <FaTags className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">Exclusive Offers</h3>
                        <p className="text-sm">Get special deals and discounts.</p>
                    </div>

                    <div className="card bg-base-200 shadow-lg p-6">
                        <FaStar className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">Premium Quality</h3>
                        <p className="text-sm">Only the best beauty products for you.</p>
                    </div>

                    <div className="card bg-base-200 shadow-lg p-6">
                        <FaGift className="text-primary text-5xl mx-auto" />
                        <h3 className="font-semibold text-lg mt-3">Gift Options</h3>
                        <p className="text-sm">Special gift packaging and gift cards available.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default WhyChooseUs;
