import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

export default function PostWidget({ categories, slug }) {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        async function getSimilar() {
            const similarPosts = await getSimilarPosts(categories, slug);
            setRelatedPosts(similarPosts);
        }

        async function getRecent() {
            const recentPosts = await getRecentPosts();
            setRelatedPosts(recentPosts);
        }

        if (slug) {
            getSimilar();
        } else {
            getRecent();
        }
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            alt={post.title}
                            className="align-middle rounded-full h-16 w-16 object-cover"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-md"
                            key={index}
                        >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
