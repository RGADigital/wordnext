import { gql } from '@apollo/client';
import {
    ACCORDITION_INFO_FRAGMENT,
    HERO_FRAGMENT,
    LARGE_ARTICLE_FRAGMENT,
    SQUARE_ARTICLE_FRAGMENT,
} from './fragments';

export const GET_PAGE_BY_URI = gql`
    query pageByURI($uri: String, $language: LanguageCodeEnum!) {
        pageBy(uri: $uri) {
            translation(language: $language) {
                title
                uri
                container {
                    modules {
                        ...HeroFragment
                        ...SquareArticleFragment
                        ...LargeArticleFragment
                        ...AccorditionInfoFragment
                    }
                }
            }
        }
    }
    ${HERO_FRAGMENT}
    ${SQUARE_ARTICLE_FRAGMENT}
    ${LARGE_ARTICLE_FRAGMENT}
    ${ACCORDITION_INFO_FRAGMENT}
`;

export const GET_ALL_PAGES = gql`
    query getAllPages {
        pages {
            nodes {
                uri
                language {
                    code
                }
            }
        }
    }
`;
