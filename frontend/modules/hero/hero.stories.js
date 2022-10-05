import { NextIntlProvider } from 'next-intl';
import Hero from './hero';

const Component = {
    title: 'Modules/Hero',
    component: Hero,
    argTypes: {
        backgroundColor: {
            control: { type: 'color' },
            description: 'Set the title to the module',
            defaultValue: 'rgb(221,51,51)',
        },
        title: {
            control: { type: 'text' },
            description: 'Set the title to the module',
            defaultValue: 'NextJS + Wordpress Website',
        },
        body: {
            control: { type: 'text' },
            description: 'Set description to the module',
            defaultValue:
                'This is a test page using nextjs for develop the frontend and wordpress for manage the content of the site.',
        },
    },
};

export default Component;

export const Default = (args) => (
    <NextIntlProvider locale="EN">
        <Hero {...args} />
    </NextIntlProvider>
);
