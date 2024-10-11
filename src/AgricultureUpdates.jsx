import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const AgricultureNews = () => {
    const [news, setNews] = useState([]);  // Initialize news as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    // Fetch Agriculture News using the Netlify Function
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/.netlify/functions/agriculture-news');
                if (response.data && response.data.articles) {
                    const filteredNews = response.data.articles;
                    setNews(filteredNews); 
                } else {
                    setError('No news articles found.');
                }
                setLoading(false);
            } catch (err) {
                const message = err.response?.data?.error || 'Error fetching agricultural news.';
                setError(message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto px-4 lg:px-14 py-6" id='agrinews'>
            {/* Header Section */}
            <div className="md:w-1/2 mx-auto text-center" data-aos="zoom-out">
                <h2 className="text-4xl text-green-600 font-semibold mb-2">Agricultural News</h2>
                <p className="text-green-500">What's New!</p>
            </div>

            {/* News Container */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                {loading ? (
                    <p className="text-gray-500 text-center">Loading news...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    news.length > 0 ? (  // Check if news is not empty
                        <div className="space-y-6 max-h-96 overflow-y-auto">
                            {news.map((article, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-start justify-between bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition ease-in-out duration-200"
                                >
                                    <div className="flex-grow">
                                        <a 
                                            href={article.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-lg text-green-600 font-semibold hover:underline"
                                        >
                                            {article.title}
                                        </a>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {article.description.slice(0, 100) + '...'}
                                        </p>
                                    </div>
                                    <span className="ml-4 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">NEW</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No news available.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default AgricultureNews;
