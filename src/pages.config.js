import About from './pages/About';
import Contact from './pages/Contact';
import ForAdvertisers from './pages/ForAdvertisers';
import ForBusinesses from './pages/ForBusinesses';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import PitchDeck from './pages/PitchDeck';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "ForAdvertisers": ForAdvertisers,
    "ForBusinesses": ForBusinesses,
    "Home": Home,
    "HowItWorks": HowItWorks,
    "PitchDeck": PitchDeck,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};