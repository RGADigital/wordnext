import { gql } from '@apollo/client';

export const LARGE_ARTICLE_FRAGMENT = gql`
    fragment LargeArticleFragment on Page_Sections_Sections_LargeArticle {
        largeArticle {
            title
            description
            image {
                sourceUrl
            }
            url {
                target
                title
                url
            }
        }
    }
`;
