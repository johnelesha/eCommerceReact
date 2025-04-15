import { Link } from 'react-router';
import backG from '../../assets/images/404notfound-removebg-preview.png';

const Page404 = () => {
    return (
        <>
            <div className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://images.pexels.com/photos/4681326/pexels-photo-4681326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <img src={backG} />
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5 text-lg">
                            There might be an issue with the page request from the server, or the URL you entered may be incorrect.
                            Please check the URL and try again later, or Click the button below to go back to the home page.
                        </p>
                        <Link to="/" className="mt-6">
                            <button className="btn btn-outline btn-info rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Go to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page404;
