import { gql } from '@apollo/client';

export const ACCORDITION_INFO_FRAGMENT = gql`
    fragment AccorditionInfoFragment on Page_Container_Modules_AccorditionInfo {
        accorditionInfo {
            title
            description
        }
    }
`;
