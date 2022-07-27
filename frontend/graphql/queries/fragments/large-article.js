import { gql } from '@apollo/client';

export const LARGE_ARTICLE_FRAGMENT = gql`
    fragment LargeArticleFragment on Page_Container_Modules_LargeArticle {
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
