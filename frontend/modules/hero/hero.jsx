const Hero = ({ heroData }) => {
    return (
        <section style={{ backgroundColor: heroData.backgroundColor, marginBottom: '3rem' }}>
            <div style={{ maxWidth: 1280, margin: 'auto', textAlign: 'center', padding: '2rem 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{heroData.title}</h2>
                <p style={{ fontSize: '1.4rem' }}>{heroData.body}</p>
            </div>
        </section>
    );
};

export default Hero;
