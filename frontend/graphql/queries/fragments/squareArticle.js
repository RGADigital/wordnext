import { gql } from '@apollo/client';

export const SQUARE_ARTICLE_FRAGMENT = gql`
    fragment SquareArticleFragment on Page_Sections_Sections_SquareArticle {
        squareArticle {
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
