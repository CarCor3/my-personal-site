import GlobeComponent from '../../components/GlobeComponent';

export default function About() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#8A7650' }}>
            <div className="py-32 md:py-60 max-w-5xl mx-auto px-6 sm:px-6 lg:px-0 flex-grow">

                {/* Bio + Globe side by side */}
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-12">

                    {/* Bio text */}
                    <div className="flex-1 text-center md:text-left">
                        <p className="font-dogica text-lg md:text-xl font-bold mb-8" style={{ color: '#FDF8F5' }}>
                            I'm a passionate Electrical Enginner graduated from Georgia Tech. I was born and raised in Lima, Peru.
                        </p>
                        <p className="font-dogica text-lg md:text-xl font-bold mb-8" style={{ color: '#FDF8F5' }}>
                            When I was a kid my dad would take me to help him do some cabling in some houses including ours. He didn't know by that time but he feeded my passion for the electricity.
                        </p>
                        <p className="font-dogica text-lg md:text-xl font-bold" style={{ color: '#FDF8F5' }}>
                            Since then, I've been improving my skills in electronics. When I'm not working on something, you can find me making content creation or playing the guitar.
                        </p>
                    </div>

                    {/* Interactive Globe */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
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
