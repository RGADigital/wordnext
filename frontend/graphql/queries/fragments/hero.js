import { gql } from '@apollo/client';

export const HERO_FRAGMENT = gql`
    fragment HeroFragment on Page_Container_Modules_Hero {
        hero {
            title
            body
            backgroundColor
        }
    }
`;
