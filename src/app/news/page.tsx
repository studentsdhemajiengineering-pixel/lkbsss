
'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { NewsArticle } from "@/lib/placeholder-data";

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState('All');

    const filteredArticles = newsArticles.filter(article => {
        if (activeTab === 'All') return true;
        if (activeTab === 'News Articles') return article.category === 'Latest';
        if (activeTab === 'Books') return article.category === 'Book';
        return false;
    });

  return (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-headline">Latest Updates &amp; News</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Stay informed with the latest announcements, programs, and initiatives designed to serve our community better.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button 
                    onClick={() => setActiveTab('All')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'All' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setActiveTab('News Articles')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'News Articles' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                    News Articles
                </button>
                <button 
                    onClick={() => setActiveTab('Books')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'Books' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                    Books
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredArticles.map((article: NewsArticle) => {
                const articleImage = article.category === 'Book' ? { imageUrl: `/images/${article.imageId}`, alt: article.title } : PlaceHolderImages.find(p => p.id === article.imageId);
                return (
                    <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                    >
                        <div className="relative">
                            {articleImage && (
                                <Image
                                    src={articleImage.imageUrl}
                                    alt={article.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                             <span className={`absolute top-3 left-3 text-white px-2 py-1 rounded-full text-xs font-medium ${article.category === 'Book' ? 'bg-purple-500' : 'bg-green-500'}`}>{article.category}</span>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2 h-12 line-clamp-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 h-20 line-clamp-4">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(article.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {Math.floor(Math.random() * 50)}k
                                </div>
                            </div>
                            <div className="mt-3 text-blue-500 group-hover:text-blue-600 text-sm font-medium flex items-center">
                                Read More
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>
                )
                })}
            </div>
             {filteredArticles.length === 0 && (
                <div className="text-center col-span-full py-12">
                    <p className="text-gray-500">No {activeTab.toLowerCase()} found.</p>
                </div>
             )}
            <div className="text-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Load More Posts</Button>
            </div>
        </div>
    </section>
  );
}
