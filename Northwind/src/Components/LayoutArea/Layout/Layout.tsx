import Home from "../../HomeArea/Home/Home";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <aside>
                <Menu />
            </aside>
            <main>
                <Home />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
