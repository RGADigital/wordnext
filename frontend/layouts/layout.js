import { Meta } from '../components';

const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
