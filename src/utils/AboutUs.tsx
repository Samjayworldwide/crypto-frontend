// src/components/AboutUs.tsx
import React from 'react';
import "./about.css";

const AboutUs: React.FC = () => {
    return (
        <section className="about-us bg-white text-gray-800 p-8">
            <div className="container mx-auto">
                <div className='inner-container'>
                <h1 className="text-4xl font-bold mb-6 header">About Us</h1>
                <p className="mb-4 paragraph">
                    Welcome to EuroLotto Adventures, where dreams turn into extraordinary experiences! We are more than just a lottery company; we are your gateway to a world of unforgettable memories and thrilling adventures. At EuroLotto Adventures, we believe that everyone deserves a taste of excitement, a moment of thrill, and a lifetime of memories, which is why we have crafted a unique lotto experience that not only offers incredible cash prizes but also the chance to explore Europe and beyond.
                </p>
                </div>

                <div className='inner-container'>
                <h2 className="text-3xl font-semibold mb-4 header">Our Mission</h2>
                <p className="mb-4 paragraph">
                    Our mission is to provide a fun, fair, and transparent lottery experience that brings joy and excitement to our players. We are committed to creating life-changing moments by offering not just financial rewards, but also opportunities to see the world, experience new cultures, and make lifelong memories. Every ticket you purchase is a step closer to a thrilling adventure in some of the most beautiful and historic places on Earth.
                </p>
                </div>

                <h2 className="text-3xl font-semibold mb-10 header">WHAT WE OFFER</h2>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Amazing Prizes</h3>
                <p className="mb-4 paragraph">
                    At EuroLotto Adventures, winning isn't just about cash. Our grand prize winners embark on all-expenses-paid trips to Europe's most iconic destinations. Imagine strolling through the romantic streets of Paris, exploring the ancient ruins of Rome, or cruising through the scenic fjords of Norway. In addition to these spectacular trips, we offer a range of other exciting prizes including luxury cars, tech gadgets, and cash rewards.
                </p>
                </div>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Fair Play</h3>
                <p className="mb-4 paragraph">
                    We are committed to maintaining the highest standards of integrity and transparency. Our draws are conducted under strict supervision and use state-of-the-art technology to ensure fairness and randomness. We believe in building trust with our players by being open and transparent about our processes.
                </p>
                </div>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Community Focused</h3>
                <p className="mb-4 paragraph">
                    We are not just about giving; we are about giving back. EuroLotto Adventures proudly supports various charitable initiatives and community projects. We believe in making a positive impact, not just in the lives of our winners, but in the communities we serve.
                </p>
                </div>

                <h2 className="text-3xl font-semibold mb-10 header">WHY CHOOSE US?</h2>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Trusted and Secure</h3>
                <p className="mb-4 paragraph">
                    Our platform is designed with your security in mind. We use advanced encryption technologies to protect your personal information and ensure safe transactions. You can play with confidence, knowing that your data is secure.
                </p>
                </div>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Customer-Centric Approach</h3>
                <p className="mb-4 paragraph">
                    Our players are at the heart of everything we do. We are dedicated to providing excellent customer service and ensuring that your experience with us is seamless and enjoyable. Our friendly and knowledgeable support team is always here to help you with any queries or concerns.
                </p>
                </div>

                <div className='inner-container'>
                <h3 className="text-2xl font-semibold mb-2 header">Innovative Experience</h3>
                <p className="mb-4 paragraph">
                    We constantly strive to innovate and enhance our offerings. From easy-to-use online platforms to exciting new prizes and experiences, we are always looking for ways to make your lottery experience more enjoyable and rewarding.
                </p>
                </div>

                <h2 className="text-3xl font-semibold mb-4 header">JOIN US</h2>

                <div className='inner-container'>
                <p className="mb-4 paragraph mt-10">
                    Becoming a part of the EuroLotto Adventures family is easy. Simply purchase a ticket, and you could be on your way to winning fantastic prizes and embarking on the adventure of a lifetime. Whether you’re dreaming of exploring Europe’s vibrant cities, relaxing on a Mediterranean beach, or enjoying other exciting rewards, EuroLotto Adventures is here to make those dreams come true.
                </p>
                <p className="mb-4 paragraph">
                    Thank you for choosing EuroLotto Adventures. We are excited to have you on this journey with us, and we look forward to creating many unforgettable moments together. Play, win, and explore with EuroLotto Adventures!
                </p>
                <p className="italic paragraph">
                    Note: Remember to gamble responsibly. EuroLotto Adventures encourages players to play for fun and within their means.
                </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
