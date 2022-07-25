import { gql } from '@apollo/client';

export const HERO_FRAGMENT = gql`
    fragment HeroFragment on Page_Sections_Sections_Hero {
        hero {
            title
            body
            backgroundColor
        }
    }
`;
