import Home from './pages/Home';
import ForBusinesses from './pages/ForBusinesses';
import ForAdvertisers from './pages/ForAdvertisers';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "ForBusinesses": ForBusinesses,
    "ForAdvertisers": ForAdvertisers,
    "HowItWorks": HowItWorks,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};