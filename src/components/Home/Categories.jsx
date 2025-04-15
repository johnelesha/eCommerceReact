import React from "react";
import forWomenImg from "../../assets/images/forWomen.png";
import forMenImg from "../../assets/images/forMen.png";
import accessoryImg from "../../assets/images/accessory.png";

function Categories() {
  const categories = [
    {
      title: "For Women's",
      count: "2500+ items",
      items: [
        "Hydrating Moisturizers",
        "Anti-aging Serums",
        "Brightening Face Masks",
        "Lip Care Products",
        "Makeup Removers",
        "Sunscreens",
        "Eye Creams",
      ],
      className: "md:col-span-3 md:row-span-6 ",
      image: forWomenImg,
    },
    {
      title: "For Men's",
      count: "1500+ items",
      items: [
        "Face Wash & Cleaners",
        "Aftershave & Lotions",
        "Anti-fatigue Eye Rollers",
        "Moisturizers",
      ],
      className: "md:col-span-3 md:row-span-3 md:col-start-4",
      image: forMenImg,
    },
    {
      title: "Accessories",
      count: "200+ items",
      items: [
        "Travel Cosmetic Bags",
        "Facial Cleansing Brushes",
        "Applicators & Sponges",
        "Cotton Pads & Towels",
      ],
      className: "md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-4",
      image: accessoryImg,
    },
  ];
  return (
    <>
      <div className="mx-auto px-4 py-8 max-w-7xl">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 ">
          <div className="divider">Our Category</div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden ${category.className}`}
            >
              <div className="absolute inset-0 z-10 bg-sky-50">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full object-cover absolute end-0.5"
                />
              </div>

              <div className="relative z-10 flex flex-col p-6 text-black">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    {category.title}
                  </h2>
                  <span className="px-3 py-1 bg-blue-950 text-white rounded-full text-sm font-medium">
                    {category.count}
                  </span>
                </div>

                <ul className="mt-auto space-y-5 text-sm pl-2 text-gray-500">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-blue-700 transition-colors"
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Categories;
