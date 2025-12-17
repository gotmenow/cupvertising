import Home from './pages/Home';
import ForBusinesses from './pages/ForBusinesses';
import ForAdvertisers from './pages/ForAdvertisers';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import PitchDeck from './pages/PitchDeck';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "ForBusinesses": ForBusinesses,
    "ForAdvertisers": ForAdvertisers,
    "HowItWorks": HowItWorks,
    "Contact": Contact,
    "PitchDeck": PitchDeck,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};