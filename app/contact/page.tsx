import Image from 'next/image';

export default function Contact() {
    return (
        <div className="py-60 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <h1 className="font-daydream text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: '#000000' }}>
                Contact
            </h1>
            <div className="flex flex-col gap-8">
                <a
                    href="https://www.instagram.com/carloscordova03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group"
                >
                    <div className="relative w-12 h-12">
                        <Image
                            src="/backgrounds/IG2.png" /*IG logo*/
                            alt="Instagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold font-dogica group-hover:text-pink-600 transition-colors" style={{ color: '#000000' }}>
                        carloscordova03
                    </span>
                </a>

                <a
                    href="https://www.instagram.com/gtxperu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group"
                >
                    <div className="relative w-12 h-12">
                        <Image
                            src="/backgrounds/IG2.png"
                            alt="Instagram GT Peru"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold font-dogica group-hover:text-pink-600 transition-colors" style={{ color: '#000000' }}>
                        GT Peru
                    </span>
                </a>

                <a
                    href="mailto:carlos.cordova.03@outlook.com"
                    className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group"
                >
                    <div className="relative w-12 h-12">
                        <Image
                            src="/backgrounds/mail.png"
                            alt="Email"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold font-dogica group-hover:text-blue-600 transition-colors" style={{ color: '#000000' }}>
                        carlos.cordova.03
                    </span>
                </a>

                <a
                    href="https://www.linkedin.com/in/carloscordova3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group"
                >
                    <div className="relative w-12 h-12">
                        <Image
                            src="/backgrounds/linkedin.png"
                            alt="LinkedIn"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold font-dogica group-hover:text-blue-700 transition-colors" style={{ color: '#000000' }}>
                        carloscordova3
                    </span>
                </a>
            </div>
        </div>
    );
}
