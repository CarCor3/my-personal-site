import ProjectCard from '../../components/ProjectCard';

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform built with Next.js, Stripe, and Redux. Includes product filtering, cart management, and user authentication.',
        link: 'https://example.com/ecommerce'
    },
    {
        title: 'Task Management App',
        description: 'A productivity app using React Native and Firebase. Syncs across devices and allows collaborative task lists.',
        link: 'https://example.com/tasks'
    },
    {
        title: 'Data Visualization Dashboard',
        description: 'Interactive dashboard for visualizing complex datasets using D3.js and TypeScript. Features real-time updates and customizable widgets.',
        link: 'https://example.com/dashboard'
    },
    {
        title: 'Personal Portfolio',
        description: 'This website! A showcase of my work and skills, built with Next.js and Tailwind CSS.',
        link: '/'
    }
];

export default function Projects() {
    return (
        <div className="py-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-daydream text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: '#000000' }}>Example Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
            </div>
        </div>
    );
}
