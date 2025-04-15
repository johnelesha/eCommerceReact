import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const ContactForm = () => {
  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";

  return (
    <div>
      <div className="flex flex-col justify-center items-start text-left px-6">
        <h1 className={`text-3xl font-bold ${textColor} mb-4`}>Contact Us</h1>
        <p className={`${textColor} mb-8`}>
          Not sure what you need? The team at Square Events will be happy to
          listen to you and suggest event ideas you hadn't considered.
        </p>

        <div className="space-y-6">
          <div className={`flex items-center space-x-3 ${textColor}`}>
            <a href="mailto:glamorix6@gmail.com">
              {" "}
              <MdOutlineEmail className="text-2xl" />
            </a>
            <a href="mailto:glamorix6@gmail.com" className="hover:underline">
              E-mail
            </a>
          </div>
          <div className={`flex items-center space-x-3 ${textColor}`}>
            <a href="https://wa.me/201024556673">
              <FaPhoneAlt className="text-2xl" />
            </a>
            <a href="https://wa.me/201024556673" className="hover:underline">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
