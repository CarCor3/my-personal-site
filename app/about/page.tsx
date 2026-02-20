import GlobeComponent from '../../components/GlobeComponent';

export default function About() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#8A7650' }}>
            <div className="py-60 max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">

                {/* Bio + Globe side by side */}
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Bio text */}
                    <div className="flex-1">
                        <p className="font-dogica text-xl font-bold mb-6" style={{ color: '#FDF8F5' }}>
                            I'm a passionate Electrical Enginner graduated from Georgia Tech. I was born and raised in Lima, Peru.
                            I love building hardware projects that solve real-world problems.
                        </p>
                        <p className="font-dogica text-xl font-bold" style={{ color: '#FDF8F5' }}>
                            When I was a kid my dad would take me to help him do some cabling in some houses including ours. He didn't know by that time but he feeded my passion for the electricity.
                            Since then, I've been improving my skills in electronics. When I'm not working on something, you can find me making content creation or playing the guitar.
                        </p>
                    </div>

                    {/* Interactive Globe */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <GlobeComponent />
                        <p className="font-dogica text-sm" style={{ color: '#FDF8F5', opacity: 0.8 }}>
                            📍 Lima, Peru
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
