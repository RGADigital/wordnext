import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import client from '../graphql/clients/endpoint-client';
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries/pages-query';
import Layout from 'layouts/layout';
import BlockRender from '../lib/block-render';

export default function Page({ data, preview }) {
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

export const getStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const slugFiltered = () => {
        if (params.slug) {
            return params.slug[0] ? params.slug[0] : '/';
        } else {
            return '/';
        }
    };

    const { data } = await client.query({
        query: GET_PAGE_BY_SLUG,
        variables: {
            slug: slugFiltered(),
        },
    });

    if (!data.pageBy || slugFiltered() === 'homepage') {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            preview,
            data: data.pageBy,
        },
        revalidate: 1,
    };
};

export const getStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_PAGES,
    });

    const allPages = [...data.pages.nodes];

    allPages.push({ __typename: 'Page', slug: '' });

    const paths =
        allPages.map(({ slug }) => {
            return {
                params: {
                    slug: [slug !== '/' ? `/${slug}` : null],
                },
            };
        }) || [];

    return {
        paths,
        fallback: 'blocking',
    };
};
