import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData = {
        service_id: "your_service_id",
        template_id: "your_template_id",
        user_id: "your_user_id",
        template_params: {
          to_email: "glamorix6@gmail.com",
          from_email: email,
          message: "New newsletter subscription",
        },
      };

      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        emailData
      );

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <section className="relative py-16 px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://img.freepik.com/free-photo/spa-body-care-items-blue-with-tropical-leaves_169016-4104.jpg?uid=R94743549&ga=GA1.1.894774702.1735655482&semt=ais_hybrid&w=740" 
          alt="Newsletter background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          <span className="inline-block pb-2 border-b-2 border-white">Our Newsletter</span>
        </h2>
        <p className="text-xl mb-8 text-gray-200">Stay updated with our latest products and offers</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Email@example.com"
            className="px-4 py-3 w-full sm:w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 cursor-pointer bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-lg ${
              message.includes("Thank you") ? "text-green-300" : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;