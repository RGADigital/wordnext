import { Footer, Meta, Nav } from '../components';

const Layout = ({ preview, children }) => {
    return (
        <>
            <Meta />
            <div className="min-h-screen">
                <Nav />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
