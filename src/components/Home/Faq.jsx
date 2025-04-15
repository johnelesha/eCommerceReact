import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long until we deliver your product",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Rhoncus cursus velit commodo odio. Scelerisque cursus facilisis cliquet eu. Nisi sed do eiusmod tempor incididunt ut labore et dolore magna aliquam nulla eget.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide with varying delivery times.",
    },
    {
      question: "Can I return or exchange my purchase?",
      answer:
        "We offer 30-day returns for most unused products in original packaging.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            <div className="divider"> Frequently asked questions</div>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <span className="text-2xl cursor-pointer">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="mt-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
