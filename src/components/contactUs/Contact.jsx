import useTheme from "../../hooks/useTheme";

const Contact = () => {
  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";
  const textPlaceHolder = theme == "night" ? "text-white" : "text-gray-500";
  const bgColor = theme == "winter" ? "bg-gray-200" : "bg-gray-500";

  return (
    <>
      <div className={`${bgColor} rounded px-8 py-12 mx-auto w-full max-w-2xl`}>
        <p className={`text-center text-lg font-semibold mb-6 ${textColor}`}>
          We'd love to hear from you!
          <br />
          Let's get in touch
        </p>
        <form action="https://getform.io/f/bvrwldob" method="POST">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-4">
            <div className="flex flex-col items-center">
              <label className="input validator w-full">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  className={`w-full ${textPlaceHolder}`}
                />
              </label>
              <p className="validator-hint text-sm text-gray-600 text-center mt-1">
                Must be 3 to 30 characters
              </p>
            </div>

            <div className="flex flex-col items-center">
              <label className="input validator flex items-center gap-2 w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                  className={`w-full ${textPlaceHolder}`}
                />
              </label>
              <p className="validator-hint hidden">Enter valid email address</p>
            </div>

            <div className="flex flex-col items-center">
              <label className="input validator flex items-center gap-x-2 w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <input
                  name="phone"
                  type="tel"
                  className={`tabular-nums w-full ${textPlaceHolder}`}
                  required
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="10"
                  title="Must be 10 digits"
                />
              </label>
              <p className="validator-hint text-sm text-gray-600 text-center mt-1">
                Must be 10 digits
              </p>
            </div>

            <div className="flex flex-col items-center">
              <label className="input validator w-full">
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="Address"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  className={`w-full ${textPlaceHolder}`}
                />
              </label>
              <p className="validator-hint text-sm text-gray-600 text-center mt-1">
                Must be 3 to 30 characte
              </p>
            </div>

            <div className="col-span-full">
              <input
                name="message"
                type="text"
                placeholder="Enter your message..."
                className={`input input-bordered w-full p-3 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 ${textPlaceHolder}`}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="rounded py-2 px-5 text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
