import { gql } from '@apollo/client';

export const FOOTER_FRAGMENT = gql`
    fragment FooterFragment on Footer {
        footer {
            footer {
                copyright
            }
        }
    }
`;
