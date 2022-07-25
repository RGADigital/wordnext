import { gql } from '@apollo/client';

export const ARTICLE_FULL_FRAGMENT = gql`
    fragment ArticleFullFragment on Article_Sections_Sections_ArticleFull {
        articleFull {
            author
            body
            date
            title
        }
    }
`;
