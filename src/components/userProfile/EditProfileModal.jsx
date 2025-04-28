import { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "../../hooks/useTheme";

const EditProfileModal = ({ userId }) => {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";
  const bgColor = theme == "winter" ? "bg-gray-200" : "bg-sky-950";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    image: "",
  });

  useEffect(() => {
    axios.get(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users/${userId}`).then((res) => {
      const userData = res.data;
      setUser(userData);
      const address = userData.address?.[0] || {};
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        street: address.street || "",
        city: address.city || "",
        zip: address.zip || "",
        country: address.country || "",
        image: userData.image || "",
      });
    });
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: [
        {
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: form.country,
        },
      ],
      paypal: form.paypal,
      image: form.image,
    };

    try {
      await axios.put(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users/${userId}`, updatedUser);
      alert("The user has been updated");
    } catch (err) {
      console.error(err);
      alert("the user has not been updated");
    }
  };

  return (
    <>
      <input type="checkbox" id="edit-profile" className="modal-toggle" />
      <div className="modal">
        <div className={`modal-box ${bgColor} max-w-xl`}>
          <h3 className={`font-bold text-lg mb-4 ${textColor}`}>Modify data</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Name "
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Email "
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="phone"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="street"
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="city"
              />
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="zip code"
              />
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="country"
              />
            </div>


            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="your New image "
            />

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-lime-500 hover:bg-lime-600 text-white"
              >
                Save Modifications
              </button>
              <label htmlFor="edit-profile" className="btn bg-red-500 hover:bg-red-600 text-white">
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
