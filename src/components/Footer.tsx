import { Link } from "react-router-dom";
import { useState } from "react";
// import logo from '../assets/images/markets-old.png'
import logo from '../assets/images/logo.png'


const Footer = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    // Close modal when clicking outside modal content
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShowPrivacy(false);
            setShowTerms(false);
        }
    };

    return (
        <>
            <footer className="w-full bg-gray-100 border-t mt-12 py-10 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand/Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link to="/" className="block">
                                <img src={logo} alt="CheapMarket Logo" className="w-20 h-20 rounded cursor-pointer" />
                            </Link>
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">CheapMarket</h2>
                        </div>
                        <p className="text-gray-600 text-sm">
                            The easiest way to compare prices, revise discount journals, and analyze food nutrition with AI.
                        </p>
                        <p className="text-gray-400 text-xs mt-4">
                            © 2025 - {new Date().getFullYear()} CheapMarket. All rights reserved.
                        </p>
                    </div>
                    {/* Navigation */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/journals" className="text-gray-600 hover:text-blue-600 transition">
                                    Journals
                                </Link>
                            </li>
                            <li>
                                <Link to="/nutrition-analyzer" className="text-gray-600 hover:text-blue-600 transition">
                                    Nutrition Analyzer
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-wallet" className="text-gray-600 hover:text-blue-600 transition">
                                    My Bonus Cards
                                </Link>
                            </li>
                            <li>
                                <Link to="/find-closest-market" className="text-gray-600 hover:text-blue-600 transition">
                                    Closest Market
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-gray-600 hover:text-blue-600 transition">
                                    Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Legal/Contact */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">Support & Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowPrivacy(true)}
                                    className="text-gray-600 hover:text-blue-600 transition underline cursor-pointer"
                                    type="button"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowTerms(true)}
                                    className="text-gray-600 hover:text-blue-600 transition underline cursor-pointer"
                                    type="button"
                                >
                                    Terms of Use
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-8 text-center text-xs text-gray-500">
                    While using CheapMarket, you agree to have read and accepted our{" "}
                    <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={() => setShowTerms(true)}
                    >
                        terms of use
                    </span>{" "}
                    and{" "}
                    <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={() => setShowPrivacy(true)}
                    >
                        privacy policy
                    </span>
                    .
                </div>
            </footer>

            {/* Privacy Policy Modal */}
            {showPrivacy && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 cursor-pointer"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative cursor-default">
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                            onClick={() => setShowPrivacy(false)}
                            aria-label="Close"
                            type="button"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
                        <div className="mt-4 text-gray-600 space-y-4 leading-relaxed">
                            <section>
                                <h4 className="font-bold text-gray-800 text-lg mb-2">1. Image & OCR Data</h4>
                                <p>
                                    Images uploaded to the Nutri Analyzer are processed temporarily to extract text. We do not store your personal photos on our permanent servers.
                                </p>
                            </section>
                            <section>
                                <h4 className="font-bold text-gray-800 text-lg mb-2">2.  AI Integration</h4>
                                <p>
                                    Text extracted from labels is sent to   AI for analysis. No personally identifiable information (PII) is shared during this process.
                                </p>
                            </section>
                            <section>
                                <h4 className="font-bold text-gray-800 text-lg mb-2">3. Local Storage</h4>
                                <p>
                                    Discount Journals and search preferences are stored locally on your device to ensure privacy and fast access.
                                </p>
                            </section>
                        </div>
                        <div className="mt-6 border-t pt-4 text-right">
                            <button
                                onClick={() => setShowPrivacy(false)}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Terms of Use Modal */}
            {showTerms && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 cursor-pointer"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative cursor-default">
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                            onClick={() => setShowTerms(false)}
                            aria-label="Close"
                            type="button"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4">Terms of Use</h2>
                        <div className="mt-4 text-gray-600 space-y-4 leading-relaxed">
                            <section>
                                <h4 className="font-semibold text-gray-800">1. Intellectual Property</h4>
                                <p>
                                    All logic, source code, design elements, and AI prompt structures used in <strong>CheapMarket</strong> (including the Nutri Analyzer and Discount Journals) are the exclusive proprietary property of the owner.
                                </p>
                            </section>
                            <section>
                                <h4 className="font-semibold text-gray-800">2. No Automated Access (Scraping)</h4>
                                <p>
                                    Automated data collection, "scraping," "crawling," or the use of spiders/bots to extract data from this website is <strong>strictly prohibited</strong>.
                                </p>
                            </section>
                            <section>
                                <h4 className="font-semibold text-gray-800">3. Restriction on Reproduction</h4>
                                <p>
                                    Users may not reproduce, clone, or reverse-engineer the project for commercial or competitive use.
                                </p>
                            </section>
                            <section>
                                <h4 className="font-semibold text-gray-800">4. Disclaimer of Accuracy</h4>
                                <p>
                                    Data is provided "as is." While we strive for accuracy, CheapMarket does not warrant the real-time accuracy of third-party prices or the medical validity of AI-generated nutritional scores. Please use the information responsibly.
                                </p>
                            </section>
                        </div>
                        <div className="mt-6 border-t pt-4 text-right">
                            <button
                                onClick={() => setShowTerms(false)}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;