import { gql } from '@apollo/client';

export const ARTICLE_FULL_FRAGMENT = gql`
    fragment ArticleFullFragment on Article_Container_Modules_ArticleFull {
        articleFull {
            author
            body
            date
            title
        }
    }
`;
