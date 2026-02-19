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
                            Hello! I'm <span className="font-semibold">Carlos Cordova</span>. I'm a passionate developer from Lima, Peru.
                            I love building web applications that solve real-world problems. With a background in [Your Background],
                            I bring a unique perspective to software engineering.
                        </p>
                        <p className="font-dogica text-xl font-bold" style={{ color: '#FDF8F5' }}>
                            My journey started when I discovered... [Add your story here]. Since then, I've been honing my skills
                            in modern web technologies. When I'm not coding, you can find me exploring new coffee shops or hiking.
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
