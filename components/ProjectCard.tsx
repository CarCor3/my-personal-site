
interface ProjectCardProps {
    title: string;
    description: string;
    link?: string;
}

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
    return (
        <div className="group rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col h-full overflow-hidden relative" style={{ backgroundColor: '#8A7650', border: '1px solid #7a6840' }}>
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#FDF8F5' }}>{title}</h3>
                <p className="leading-relaxed line-clamp-3" style={{ color: '#EAE0CF' }}>{description}</p>
            </div>
        </div>
    );
}
