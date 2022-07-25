import { gql } from '@apollo/client';

export const ACCORDITION_INFO_FRAGMENT = gql`
    fragment AccorditionInfoFragment on Page_Sections_Sections_AccorditionInfo {
        accorditionInfo {
            title
            description
        }
    }
`;
