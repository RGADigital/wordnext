import { gql } from '@apollo/client';
import { ARTICLE_FULL_FRAGMENT } from './fragments/articleFull';

export const GET_ARTICLE_BY_SLUG = gql`
    query getArticleBySlug($slug: String) {
        articleBy(slug: $slug) {
            slug
            title
            sections {
                sections {
                    ...ArticleFullFragment
                }
            }
        }
    }
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
