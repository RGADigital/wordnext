import { gql } from '@apollo/client';

export const HEADER_FRAGMENT = gql`
    fragment HeaderFragment on Header {
        header {
            header {
                leftSection {
                    url
                    title
                }
                rightSection {
                    url
                    title
                }
            }
        }
    }
`;
