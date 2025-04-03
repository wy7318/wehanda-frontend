// Add this to your types/database.ts file

export interface Post {
    id: string;
    organization_id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category?: string;
    published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}