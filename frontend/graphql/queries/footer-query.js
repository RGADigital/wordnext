import { gql } from '@apollo/client';
import { FOOTER_FRAGMENT } from './fragments';

export const GET_FOOTER = gql`
    query GetFooter {
        footerBy(uri: "footer") {
            ...FooterFragment
        }
    }
    ${FOOTER_FRAGMENT}
`;
