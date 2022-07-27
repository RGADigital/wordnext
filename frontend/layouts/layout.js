import { Footer, Meta, Nav } from '../components';

const Layout = ({ children }) => {
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
