import johnImg from '../../assets/images/john.jpeg';
import mahmoudImg from '../../assets/images/mahmoud.jpeg';
import neamaImg from '../../assets/images/neama.jpeg';
import mariamImg from '../../assets/images/mariam.jpeg';
import useTheme from '../../hooks/useTheme';

const AboutTheTeam = () => {
    const theme = useTheme();
    const bgColor = theme === 'winter' ? 'bg-base-200' : 'bg-gray-700';
    const textColor = theme === 'night' ? 'text-neutral-content' : 'text-gray-800';

    return (
        <>
            <section className="py-16 px-6 md:px-12 bg-base-200 text-base-content">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-5xl font-bold">Our Team</h2>
                    <p className="text-lg max-w-3xl mx-auto mt-4">
                        Meet the talented individuals behind our brand. Each of us is dedicated to delivering the best shopping experience for you!
                    </p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-x-15 gap-y-10">
                    <div className={`card ${bgColor} ${textColor} shadow-lg p-6 max-w-xs text-center`}>
                        <img
                            src={mariamImg}
                            alt="Mariam Nabil"
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h3 className="font-semibold text-lg mt-3">Mariam Nabil</h3>
                        <p className="text-sm">Lead Developer - Passionate about technology and crafting seamless user experiences.</p>
                    </div>

                    <div className={`card ${bgColor} ${textColor} shadow-lg p-6 max-w-xs text-center`}>
                        <img
                            src={neamaImg}
                            alt="Neama Samy"
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h3 className="font-semibold text-lg mt-3">Neama Samy</h3>
                        <p className="text-sm">Designer - Loves creating elegant, intuitive designs with a focus on usability.</p>
                    </div>

                    <div className={`card ${bgColor} ${textColor} shadow-lg p-6 max-w-xs text-center`}>
                        <img
                            src="https://placehold.co/150x150/png"
                            alt="Roaa Muhammed"
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h3 className="font-semibold text-lg mt-3">Roaa Muhammed</h3>
                        <p className="text-sm">A passionate developer focused on creating seamless user experiences through innovative solutions.</p>
                    </div>

                    <div className={`card ${bgColor} ${textColor} shadow-lg p-6 max-w-xs text-center`}>
                        <img
                            src={mahmoudImg}
                            alt="Mahmoud Mohamed"
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h3 className="font-semibold text-lg mt-3">Mahmoud Mohamed</h3>
                        <p className="text-sm">A versatile developer dedicated to optimizing performance and enhancing the functionality of applications.</p>
                    </div>

                    <div className={`card ${bgColor} ${textColor} shadow-lg p-6 max-w-xs text-center`}>
                        <img
                            src={johnImg}
                            alt="John Elesha"
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h3 className="font-semibold text-lg mt-3">John Elesha</h3>
                        <p className="text-sm">A creative front-end developer with a passion for designing clean, responsive, and visually appealing websites.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutTheTeam;
