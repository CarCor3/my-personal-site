const skills = [
    "TypeScript", "Next.js", "React", "Node.js", "TailwindCSS", "Git", "REST APIs", "GraphQL"
];

const interests = [
    "Open Source", "UI/UX Design", "Machine Learning", "Photography", "Traveling"
];

export default function About() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#8A7650' }}>
            <div className="py-60 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
                {/* Bio Section */}
                <div className="mb-12">
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
            </div>
        </div>
    );
}

