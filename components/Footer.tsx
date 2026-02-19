export default function Footer() {
    return (
        <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-20 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} . All rights reserved.</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
