/* eslint-disable indent */
import {
    /* IMPORT_MODULE */
    AccorditionInfo,
    Hero,
    SquareArticle,
} from 'modules';
import { ContentTypeMap } from './content-types';

const BlockRender = ({ block }) => {
    return block.map((section, index) => {
        switch (section.__typename) {
            case ContentTypeMap.HERO_TYPE:
                return <Hero key={index} {...section.hero} />;
            case ContentTypeMap.SQUARE_ARTICLE_TYPE:
                return (
                    <SquareArticle
                        key={index}
                        articleData={section.squareArticle}
                    />
                );
            case ContentTypeMap.ACCORDITION_INFO_TYPE:
                return (
                    <AccorditionInfo
                        key={index}
                        accorditionData={section.accorditionInfo}
                    />
                );
            /* IMPORT_CASE */
            default:
                break;
        }
    });
};

export default BlockRender;
