
import ContactForm from "../components/contactUs/ContactForm";
import Contact from "../components/contactUs/Contact";
import useTheme from "../hooks/useTheme";

const ContactUs = () => {
  const theme = useTheme();
  const bgColor = theme == "winter" ? "bg-white" : "bg-sky-950";

  return (
    <div className={`${bgColor} w-full min-h-screen flex items-center justify-center py-20 flex-wrap`}>
      <div className="grid gap-10 lg:grid-cols-2 sm:grid-cols-1 items-center justify-center w-full max-w-7xl mr-8">
        <ContactForm></ContactForm>
        <Contact></Contact>
      </div>
    </div>
  );
};

export default ContactUs;
