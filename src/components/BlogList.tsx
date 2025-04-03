import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/database';
import { Calendar, ChevronRight, Tag, BookOpen, Star, Clock, Search, ArrowRight } from 'lucide-react';

// Updated organization ID for this website
const ORGANIZATION_ID = '1e5c0f75-394e-4985-aeb9-c189b1ee7c4b';

interface BlogListProps {
    navigateToBlogPost: (slug: string) => void;
}

export default function BlogList({ navigateToBlogPost }: BlogListProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPosts, setTotalPosts] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [hoveredPost, setHoveredPost] = useState<string | null>(null);

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Item animation variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [searchQuery, selectedCategory]);

    async function fetchPosts() {
        setLoading(true);

        let query = supabase
            .from('posts')
            .select('*', { count: 'exact' })
            .eq('organization_id', ORGANIZATION_ID)
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (searchQuery) {
            query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
        }

        if (selectedCategory) {
            query = query.eq('category', selectedCategory);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('Error fetching posts:', error);
            return;
        }

        setPosts(data || []);
        setTotalPosts(count || 0);

        // Extract unique categories
        if (data) {
            const uniqueCategories = Array.from(new Set(data.map(post => post.category).filter(Boolean)));
            setCategories(uniqueCategories as string[]);
        }

        setLoading(false);
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function getReadingTime(content: string) {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }

    return (
        <section className="pt-24 pb-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -right-32 top-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-40 bottom-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
                <div className="absolute right-1/4 top-1/3 w-8 h-8 border-2 border-blue-400/20 rounded-lg rotate-12"></div>
                <div className="absolute left-1/4 bottom-1/4 w-6 h-6 bg-blue-400/20 rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-3">
                            Knowledge Center
                        </span>
                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-4">
                            Latest Insights
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Explore our latest articles and insights about restaurant technology, food industry trends, and digital solutions
                        </p>

                        <div className="max-w-xl mx-auto mt-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {categories.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === null
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        All
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="relative w-20 h-20">
                                <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-500"></div>
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                    <BookOpen className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {posts.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
                                        <Search className="h-12 w-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchQuery
                                            ? `No results for "${searchQuery}". Try a different search term.`
                                            : 'No blog posts available at the moment. Check back soon!'}
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="px-6 py-3 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4"
                                >
                                    {posts.map((post) => (
                                        <motion.article
                                            key={post.id}
                                            variants={itemVariants}
                                            onMouseEnter={() => setHoveredPost(post.id)}
                                            onMouseLeave={() => setHoveredPost(null)}
                                            className={`
                        relative group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500
                        ${hoveredPost === post.id ? 'shadow-xl scale-[1.02]' : 'hover:shadow-xl hover:scale-[1.02]'}
                      `}
                                        >
                                            {/* Top accent bar */}
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>

                                            <div className="cursor-pointer" onClick={() => navigateToBlogPost(post.slug)}>
                                                <div className="aspect-[16/9] overflow-hidden relative">
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className={`w-full h-full object-cover transition-all duration-700 ${hoveredPost === post.id ? 'scale-110 blur-[1px]' : 'scale-100'
                                                            }`}
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 ${hoveredPost === post.id ? 'opacity-100' : ''
                                                        }`}></div>

                                                    {/* Hover overlay */}
                                                    <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ${hoveredPost === post.id ? 'opacity-100' : ''
                                                        }`}>
                                                        <span className="px-6 py-3 bg-white/90 rounded-full font-medium text-blue-600 flex items-center">
                                                            Read Article
                                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <time className="text-sm text-gray-500 flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {formatDate(post.published_at)}
                                                        </time>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                                            <Tag className="w-3 h-3 mr-1" />
                                                            {post.category || 'Blog'}
                                                        </span>
                                                    </div>

                                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                                                        {post.title}
                                                    </h2>

                                                    <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>

                                                    <div className="flex justify-between items-center mt-auto">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {getReadingTime(post.content || '')}
                                                        </div>

                                                        <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                                            Read More
                                                            <ChevronRight className="h-4 w-4 ml-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}