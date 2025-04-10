import { PostWithUser } from "../../types";
import { useEffect, useRef, useState } from "react";

export interface PostCardProps {
    post: PostWithUser;
}

export default function PostCard({ post }: PostCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div
            ref={cardRef}
            className="rounded-lg overflow-hidden border border-gray-200 my-5"
        >
            <div className="relative w-100 h-110 bg-gray-100 overflow-hidden">
                {isVisible &&
                    <iframe
                        src={`https://editor.p5js.org/sokmontrey/full/${post.link}`}
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                    />
                }
                {/* User info overlaid on preview */}
                <div className="absolute bottom-6 left-2 items-center bg-white border border-gray-200 bg-opacity-60 rounded-full px-3 py-1 text-black">
                    <span className="text-sm font-medium">{post.User.username}</span>
                    <span className="mx-2 text-xs opacity-70">•</span>
                    <span className="text-xs opacity-70">{formattedDate}</span>
                </div>
            </div>

            {/* Content area */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <a
                        className="text-xl font-bold font-serif text-gray-800 hover:text-blue-600 transition group flex items-center gap-2"
                        target="_blank"
                        href={`https://editor.p5js.org/sokmontrey/sketches/${post.link}`}
                    >
                        {post.title}
                        <i className="fa-solid fa-external-link text-xs text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                </div>

                <div className="mt-2">
                    {post.description ? (
                        <p className="text-gray-600 leading-relaxed">
                            {post.description}
                        </p>
                    ) : (
                        <p className="text-gray-500 italic">
                            No description provided
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}



