function Footer() {
    return (
        <footer className="app-footer">
            <article className="brand-container">
                <h2 className="app-footer__title">VidLoader</h2>
                <p className="slogan">Upload your favorite videos with us!</p>
            </article>
            <article className="app-links-container">
                <h3 className="footer-title">Our app</h3>
                <nav className="app-links">
                    <a href="#" target="_blank">Watch videos</a>
                    <a href="#" target="_blank">Browser trends</a>
                    <a href="#" target="_blank">Upload a video</a>
                    <a href="#" target="_blank">Create an account</a>
                    <a href="#" target="_blank">About us</a>
                </nav>
            </article>
            <article className="app-links-container">
                <h3 className="footer-title">Social Media</h3>
                <nav className="app-links">
                    <a href="#" target="_blank">Instagram</a>
                    <a href="#" target="_blank">LinkedIn</a>
                    <a href="#" target="_blank">YouTube</a>
                    <a href="#" target="_blank">Twitch</a>
                    <a href="#" target="_blank">Kick</a>
                    <a href="#" target="_blank">X</a>
                </nav>
            </article>
            <article className="developer-container">
                <h3 className="footer-title dev">Developed by</h3>
                <h2 className="dev-name">RamssDev</h2>
            </article>
        </footer>
    )
}

export default Footer