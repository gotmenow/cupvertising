import About from './pages/About';
import AdvertiserOnboarding from './pages/AdvertiserOnboarding';
import BusinessOnboarding from './pages/BusinessOnboarding';
import Contact from './pages/Contact';
import Finance from './pages/Finance';
import ForAdvertisers from './pages/ForAdvertisers';
import ForBusinesses from './pages/ForBusinesses';
import Franchise from './pages/Franchise';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import PitchDeck from './pages/PitchDeck';
import SocialAgent from './pages/SocialAgent';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdvertiserOnboarding": AdvertiserOnboarding,
    "BusinessOnboarding": BusinessOnboarding,
    "Contact": Contact,
    "Finance": Finance,
    "ForAdvertisers": ForAdvertisers,
    "ForBusinesses": ForBusinesses,
    "Franchise": Franchise,
    "Home": Home,
    "HowItWorks": HowItWorks,
    "PitchDeck": PitchDeck,
    "SocialAgent": SocialAgent,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};