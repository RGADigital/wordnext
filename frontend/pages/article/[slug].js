import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import client from '../../graphql/clients/endpoint-client';
import {
    GET_ALL_ARTICLES,
    GET_ARTICLE_BY_SLUG,
} from '../../graphql/queries/articles-query';
import Layout from '../../layouts/layout';
import { ArticleFull } from '../../modules';

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
            <ArticleFull article={data.container.modules[0].articleFull} />
        </Layout>
    );
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { data } = await client.query({
        query: GET_ARTICLE_BY_SLUG,
        variables: {
            slug: params.slug,
        },
    });

    return {
        props: {
            preview,
            data: data.articleBy,
        },
    };
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_ALL_ARTICLES,
    });

    return {
        paths: data.articles.nodes.map(({ slug }) => `/article/${slug}`) || [],
        fallback: 'blocking',
    };
}
