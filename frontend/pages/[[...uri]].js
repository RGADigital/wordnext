import Head from 'next/head';
import client from 'graphql/clients/endpoint-client';
import { NextSeo } from 'next-seo';
import { GET_ALL_PAGES, GET_PAGE_BY_URI } from 'graphql/queries/pages-query';
import Layout from 'layouts/layout';
import BlockRender from 'lib/block-render';
import { LANGUAGES } from 'lib/constants';
import handleGraphErrors from '../graphql/handleErrors';
import { Footer, Header } from 'components';
import { GET_FOOTER } from 'graphql/queries/footer-query';
import { GET_HEADER } from 'graphql/queries/header-query';

export default function Page({ data, footerData, headerData }) {
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <NextSeo
                title={data.seo.title}
                description={data.seo.metaDesc}
                canonical={data.seo.canonical}
                openGraph={{
                    url: data.seo.opengraphUrl,
                    title: data.seo.opengraphTitle,
                    description: data.seo.opengraphDescription,
                    images: [
                        {
                            url: data.seo.opengraphImage?.sourceUrl,
                            width: data.seo.opengraphImage?.mediaDetails.width,
                            height: data.seo.opengraphImage?.mediaDetails
                                .height,
                            alt: data.seo.opengraphImage?.altText,
                            type: data.seo.opengraphImage?.mimeType,
                        },
                    ],
                    site_name: data.seo.opengraphSiteName,
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <Header data={headerData} />
            <BlockRender block={data.container.modules} />
            <Footer data={footerData} />
        </Layout>
    );
}

export const getStaticProps = async ({ params: { uri }, locale }) => {
    const {
        data: {
            pageBy: { translation: page },
        },
    } = await client
        .query({
            query: GET_PAGE_BY_URI,
            variables: {
                uri: !uri ? 'homepage' : uri.join('/'),
                language: LANGUAGES[locale],
            },
            errorPolicy: 'none',
        })
        .catch((e) => {
            handleGraphErrors(e);
        });

    const {
        data: {
            footerBy: { footer },
        },
    } = await client
        .query({
            query: GET_FOOTER,
        })
        .catch((e) => {
            handleGraphErrors(e);
        });

    const {
        data: {
            headerBy: { header },
        },
    } = await client
        .query({
            query: GET_HEADER,
        })
        .catch((e) => {
            handleGraphErrors(e);
        });

    if (!page) return { notFound: true };

    return {
        props: {
            data: page,
            footerData: footer?.footer,
            headerData: header?.header,
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
