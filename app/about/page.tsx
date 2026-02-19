const skills = [
    "TypeScript", "Next.js", "React", "Node.js", "TailwindCSS", "Git", "REST APIs", "GraphQL"
];

const interests = [
    "Open Source", "UI/UX Design", "Machine Learning", "Photography", "Traveling"
];

export default function About() {
    return (
        <div className="py-60 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
            {/* Bio Section */}
            <div className="mb-12">
                <p className="text-xl font-bold mb-6" style={{ color: '#000000' }}>
                    Hello! I'm <span className="font-semibold">Carlos Cordova</span>. I'm a passionate developer from Lima, Peru.
                    I love building web applications that solve real-world problems. With a background in [Your Background],
                    I bring a unique perspective to software engineering.
                </p>
                <p className="text-xl font-bold" style={{ color: '#000000' }}>
                    My journey started when I discovered... [Add your story here]. Since then, I've been honing my skills
                    in modern web technologies. When I'm not coding, you can find me exploring new coffee shops or hiking.
                </p>
            </div>

            {/* Skills Section */}
            <div className="mb-12">
                <h2 className="font-daydream text-2xl font-bold mb-6 border-b pb-2 border-black" style={{ color: '#000000' }}>Skills</h2>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-2 rounded-full text-sm font-bold border border-black cursor-default"
                            style={{ color: '#000000', backgroundColor: 'transparent' }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Interests Section */}
            <div>
                <h2 className="font-daydream text-2xl font-bold mb-6 border-b pb-2 border-black" style={{ color: '#000000' }}>Interests</h2>
                <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                        <span
                            key={interest}
                            className="px-4 py-2 rounded-full text-sm font-bold border border-black cursor-default"
                            style={{ color: '#000000', backgroundColor: 'transparent' }}
                        >
                            {interest}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
