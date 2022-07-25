import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import client from '../graphql/clients/endpoint-client';
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries/pages-query';
import Layout from 'layouts/layout';
import BlockRender from '../lib/block-render';

export default function Post({ data, preview }) {
    const router = useRouter();

    if (!router.isFallback && !data?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview}>
            <Head>
                <title>{data.title}</title>
            </Head>
            <BlockRender block={data.sections.sections} />
        </Layout>
    );
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { data } = await client.query({
        query: GET_PAGE_BY_SLUG,
        variables: {
            slug: params.slug,
        },
    });

    return {
        props: {
            preview,
            data: data.pageBy,
        },
    };
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_ALL_PAGES,
    });

    return {
        paths: data.pages.nodes.map(({ slug }) => `/${slug}`) || [],
        fallback: 'blocking',
    };
}
