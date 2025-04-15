import React from 'react'
import { FaShippingFast, FaMoneyCheckAlt, FaHeadset } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaShippingFast className="text-3xl text-blue-900" />,
      title: "Free Shipping",
      description: "Free Shipping for order above $120",
    },
    {
      icon: <FaMoneyCheckAlt className="text-3xl text-blue-900" />,
      title: "Flexible Payment",
      description: "Multiple secure payment options",
    },
    {
      icon: <FaHeadset className="text-3xl text-blue-900" />,
      title: "24x7 Support",
      description: "We Support Online all days",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-4 p-2 quicksand-regular">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center gap-4 text-center md:text-left"
        >
          <div className="bg-white rounded-full p-3">{service.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Services;