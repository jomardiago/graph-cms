import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getPosts() {
    const query = gql`
        query IndexPostsQuery {
            posts() {
                id
                author {
                    id
                    name
                    bio
                    photo {
                        url
                    }
                }
                createdAt
                excerpt
                slug
                title
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.posts;
}

export async function getRecentPosts() {
    const query = gql`
        query GetRecentPosts {
            posts(orderBy: createdAt_ASC, last: 3) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.posts;
}

export async function getSimilarPosts(categories, slug) {
    const query = gql`
        query GetSimilarPosts($categories: [String!], $slug: String!) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: { slug_in: $categories } }
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const variables = { categories, slug };

    const result = await request(graphqlAPI, query, variables);
    return result.posts;
}

export async function getCategories() {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.categories;
}
