import { gql } from '@apollo/client';
import {
    /* INJECTION_IMPORT */
    ARTICLE_FULL_FRAGMENT,
} from './fragments/article-full';

export const GET_ARTICLE_BY_SLUG = gql`
    query getArticleBySlug($slug: String) {
        articleBy(slug: $slug) {
            slug
            title
            container {
                modules {
                    """FRAGMENT_DECONSTRUCTION"""
                    ...ArticleFullFragment
                }
            }
        }
    }
    """FRAGMENT_IN_IMPORT"""
    ${ARTICLE_FULL_FRAGMENT}
`;

export const GET_ALL_ARTICLES = gql`
    query getAllArticles {
        articles {
            nodes {
                slug
            }
        }
    }
`;
