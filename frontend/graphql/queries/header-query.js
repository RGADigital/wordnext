import { gql } from '@apollo/client';
import { HEADER_FRAGMENT } from './fragments';

export const GET_HEADER = gql`
    query getHeader {
        headerBy(uri: "header") {
            ...HeaderFragment
        }
    }
    ${HEADER_FRAGMENT}
`;
