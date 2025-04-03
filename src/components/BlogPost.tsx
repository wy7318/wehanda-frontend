import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/database';
import { Calendar, ArrowLeft, Clock, Tag, Share2, BookOpen, ChevronLeft, ChevronRight, Heart, MessageCircle } from 'lucide-react';

// Updated organization ID for this website
const ORGANIZATION_ID = '1e5c0f75-394e-4985-aeb9-c189b1ee7c4b';

interface BlogPostProps {
    slug: string | null;
    navigateToBlog: () => void;
}

export default function BlogPost({ slug, navigateToBlog }: BlogPostProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }

        // Track scroll progress
        const handleScroll = () => {
            if (!contentRef.current) return;

            const contentHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
            const windowScroll = window.scrollY - contentRef.current.offsetTop;
            if (windowScroll < 0) {
                setScrollProgress(0);
                return;
            }

            const scrolled = Math.min(100, Math.max(0, (windowScroll / contentHeight) * 100));
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [slug]);

    async function fetchPost() {
        if (!slug) return;
        setLoading(true);

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('organization_id', ORGANIZATION_ID)
            .eq('published', true)
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
            setLoading(false);
            return;
        }

        setPost(data);

        // Fetch related posts
        if (data?.category) {
            const { data: relatedData } = await supabase
                .from('posts')
                .select('*')
                .eq('organization_id', ORGANIZATION_ID)
                .eq('published', true)
                .eq('category', data.category)
                .neq('id', data.id)
                .order('published_at', { ascending: false })
                .limit(3);

            setRelatedPosts(relatedData || []);
        }

        setLoading(false);

        // Scroll to top when loading a new post
        window.scrollTo(0, 0);
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function getReadingTime(content: string) {
        if (!content) return '1 min read';

        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
        return `${minutes} min read`;
    }

    function handleShareClick() {
        setIsShareOpen(!isShareOpen);
    }

    function handleShare(platform: string) {
        if (!post) return;

        const url = window.location.href;
        const title = post.title;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copied to clipboard!');
                });
                break;
        }

        setIsShareOpen(false);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-500"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white pt-20">
                <div className="text-center bg-white p-12 rounded-xl shadow-xl max-w-md">
                    <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
                        <BookOpen className="h-12 w-12 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-8">The article you're looking for might have been moved or doesn't exist.</p>
                    <button
                        onClick={navigateToBlog}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg inline-flex items-center"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Hero section */}
            <div className="h-[70vh] relative overflow-hidden pt-16">
                <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-6"
                        >
                            <button
                                onClick={navigateToBlog}
                                className="inline-flex items-center text-white/80 hover:text-white transition-colors border border-white/30 py-2 px-4 rounded-full hover:bg-white/10"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Blog
                            </button>

                            <div className="space-y-2">
                                {post.category && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600/90 text-white">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {post.category}
                                    </span>
                                )}
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(post.published_at)}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {getReadingTime(post.content)}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="container mx-auto max-w-4xl px-4 py-12" ref={contentRef}>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 relative">
                    {/* Sharing button */}
                    <div className="absolute right-6 -top-6">
                        <div className="relative">
                            <button
                                onClick={handleShareClick}
                                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-blue-500 focus:outline-none"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>

                            {isShareOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 top-12 bg-white p-3 rounded-xl shadow-xl grid grid-cols-4 gap-2 w-48"
                                >
                                    <button
                                        onClick={() => handleShare('twitter')}
                                        className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="text-blue-400 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                        </div>
                                        <span className="text-xs">Twitter</span>
                                    </button>
                                    <button
                                        onClick={() => handleShare('facebook')}
                                        className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="text-blue-600 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                        </div>
                                        <span className="text-xs">Facebook</span>
                                    </button>
                                    <button
                                        onClick={() => handleShare('linkedin')}
                                        className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="text-blue-700 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                        </div>
                                        <span className="text-xs">LinkedIn</span>
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="text-gray-600 p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" /></svg>
                                        </div>
                                        <span className="text-xs">Copy Link</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Action bar */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap justify-between items-center">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${liked
                                        ? 'bg-red-50 text-red-500'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                                {liked ? 'Liked' : 'Like'}
                            </button>

                            <button
                                onClick={() => {
                                    const commentSection = document.getElementById('comments');
                                    if (commentSection) {
                                        commentSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Comment
                            </button>
                        </div>

                        <button
                            onClick={handleShareClick}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Share2 className="h-5 w-5" />
                            Share
                        </button>
                    </div>
                </div>

                {/* Related articles */}
                {relatedPosts.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                            <span className="bg-blue-100 rounded-full p-2 mr-3">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </span>
                            Related Articles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <div
                                    key={relatedPost.id}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
                                    onClick={() => {
                                        // Navigate to the related post
                                        setPost(null);
                                        setLoading(true);
                                        slug = relatedPost.slug;
                                        fetchPost();
                                    }}
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={relatedPost.featured_image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                            {relatedPost.title}
                                        </h3>

                                        <div className="mt-auto pt-3 flex justify-between items-center text-sm text-gray-500">
                                            <time>{formatDate(relatedPost.published_at).split(',')[0]}</time>
                                            <span className="text-blue-600 group-hover:translate-x-1 transition-transform flex items-center">
                                                Read
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation between posts */}
                <div className="flex justify-between items-center my-12 gap-4">
                    <button
                        onClick={navigateToBlog}
                        className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <ChevronLeft className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">All Articles</span>
                    </button>

                    <div className="flex gap-4">
                        <button
                            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Back to top"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Comment section placeholder */}
                <div id="comments" className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                        <p className="text-gray-600 mb-6">Comments are coming soon! We're working on implementing this feature.</p>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-not-allowed">
                            Leave a Comment
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}