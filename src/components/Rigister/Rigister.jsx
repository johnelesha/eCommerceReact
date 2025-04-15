import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext"; 

const Register = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UsersContext); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    role: "customer",
    image: "",
    wishlist: [],
    ratedProductes: [],
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCheck = /[!@#$%^&*]/.test(password);

    return {
      lengthCheck,
      upperCheck,
      lowerCheck,
      numberCheck,
      specialCheck,
      isValid: lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid) {
      setErrorMsg("Password does not meet the required conditions.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: [
        {
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: form.country,
        },
      ],
      role: form.role,
      image: form.image,
      wishlist: [],
      ratedProductes: [],
    };

    try {
      await axios.post("http://localhost:3000/users", newUser);
      localStorage.setItem("userId", newUser.id);        
      setCurrentUser(newUser);                            
      alert("تم إنشاء الحساب بنجاح 🎉");
      navigate("/profile");                              
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("حدث خطأ أثناء التسجيل!");
    }
  };

  const passwordChecks = validatePassword(form.password);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {errorMsg && (
          <div className="alert alert-error text-sm">
            <span>{errorMsg}</span>
          </div>
        )}

      
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="text-sm text-gray-500 space-y-1">
          <p className={passwordChecks.lengthCheck ? "text-green-600" : "text-red-500"}>- At least 8 characters</p>
          <p className={passwordChecks.upperCheck ? "text-green-600" : "text-red-500"}>- At least one uppercase letter</p>
          <p className={passwordChecks.lowerCheck ? "text-green-600" : "text-red-500"}>- At least one lowercase letter</p>
          <p className={passwordChecks.numberCheck ? "text-green-600" : "text-red-500"}>- At least one number</p>
          <p className={passwordChecks.specialCheck ? "text-green-600" : "text-red-500"}>- At least one special character (!@#$%^&*)</p>
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="input input-bordered w-full"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          className="input input-bordered w-full"
          value={form.street}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          className="input input-bordered w-full"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          className="input input-bordered w-full"
          value={form.zip}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          className="input input-bordered w-full"
          value={form.country}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={form.image}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
