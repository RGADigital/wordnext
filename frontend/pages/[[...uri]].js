import Head from 'next/head';
import client from 'graphql/clients/endpoint-client';
import { GET_ALL_PAGES, GET_PAGE_BY_URI } from 'graphql/queries/pages-query';
import Layout from 'layouts/layout';
import BlockRender from 'lib/block-render';
import { LANGUAGES } from 'lib/constants';

export default function Page({ data }) {
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <BlockRender block={data.container.modules} />
        </Layout>
    );
}

export const getStaticProps = async ({ params: { uri }, locale }) => {
    console.log(locale);
    const {
        data: {
            pageBy: { translation: page },
        },
    } = await client.query({
        query: GET_PAGE_BY_URI,
        variables: {
            uri: !uri ? 'homepage' : uri.join('/'),
            language: LANGUAGES[locale],
        },
    });

    if (!page) return { notFound: true };

    return {
        props: {
            data: page,
            messages: (await import(`intl/${locale}.json`)).default,
        },
        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_PAGES,
    });

    const pages = [...data.pages.nodes, { __typename: 'Page', uri: '' }];

    const paths =
        pages.map(({ uri }) => {
            return {
                params: {
                    uri: [uri !== '/' ? `/${uri}` : ''],
                },
            };
        }) || [];

    return {
        paths,
        fallback: 'blocking',
    };
};
