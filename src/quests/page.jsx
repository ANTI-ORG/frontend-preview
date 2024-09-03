import {Component, createRef} from "react";
import {Link} from "react-router-dom";
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import Cookies from "js-cookie";
import {profilePath} from "../index.jsx";
import userAPI from "../global/scripts/user-api";
import renderContent from "./components/quests-content.jsx";

import "../../node_modules/swiper/swiper-bundle.min.css";
import "../../node_modules/swiper/swiper.min.css";
import "./css/quests.css";
import "./css/quests-main-part-quests-cards.css";

//Services pics
import searchIcon from './assets/images/services-pics/search-icon.png';
import arrow from './assets/images/services-pics/arrow.png';
//Chains pics
import BNBChain from './assets/images/chains-pics/bnb-chain.png';
import Polygonchain from './assets/images/chains-pics/polygon-chain.png';
import SolanaChain from './assets/images/chains-pics/solana-chain.png';
import OPChain from './assets/images/chains-pics/op-chain.png';
import ArbitrumChain from './assets/images/chains-pics/arbitrum-chain.png';
import ZebraChain from './assets/images/chains-pics/zebra-chain.png';
import AvalancheChain from './assets/images/chains-pics/avalanche-chain.png';
import VillagerChain from './assets/images/chains-pics/villager-chain.png';
import ScroolChain from './assets/images/chains-pics/scroll-chain.png';
import QredoChain from './assets/images/chains-pics/qredo-chain.png';
//Quests cards pics
import questCard1QuestPic from './assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg'
import questCard2QuestPic from './assets/images/quests-cards-pics/quest-card-2-quest-pic.jpg'
import questCard3QuestPic from './assets/images/quests-cards-pics/quest-card-3-quest-pic.jpg'
import questCard4QuestPic from './assets/images/quests-cards-pics/quest-card-4-quest-pic.jpg'
import questCard5QuestPic from './assets/images/quests-cards-pics/quest-card-5-quest-pic.jpg'
import questCard6QuestPic from './assets/images/quests-cards-pics/quest-card-6-quest-pic.jpg'
//Company cards pics
import company1CardPic from './assets/images/company-pics/company-1-card-pic.png'
import company2CardPic from './assets/images/company-pics/company-2-card-pic.png'
import company3CardPic from './assets/images/company-pics/company-3-card-pic.png'
import company4CardPic from './assets/images/company-pics/company-4-card-pic.png'
import company5CardPic from './assets/images/company-pics/company-5-card-pic.png'
import company6CardPic from './assets/images/company-pics/company-6-card-pic.png'


SwiperCore.use([Navigation, Pagination]);

class Quests extends Component {
    constructor(props) {
        super(props);
        this.swiperRef = createRef();
        this.swiperRefEcosystems = createRef();
        this.swiperRefAnti = createRef();
        this.state = {
            query: '',
            selectedStatus: null,
            selectedChains: [],
            isPrevButtonDisabled: true,
            isNextButtonDisabled: false,
            isPrevButtonDisabledAnti: true,
            isNextButtonDisabledAnti: false,
            isPrevButtonEcosystemsDisabled: true,
            isNextButtonEcosystemsDisabled: false,
            userAccount: null
        };
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevEcosystems = this.handlePrevEcosystems.bind(this);
        this.handleNextEcosystems = this.handleNextEcosystems.bind(this);
        this.handlePrevAnti = this.handlePrevAnti.bind(this);
        this.handleNextAnti = this.handleNextAnti.bind(this);
    }

    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const userAccount = await userAPI.getUser(accessToken);
            this.setState({userAccount});
        }
    }

    updateButtonStates(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonDisabled: true});
        } else {
            this.setState({isPrevButtonDisabled: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonDisabled: true});
        } else {
            this.setState({isNextButtonDisabled: false});
        }
    }

    updateButtonStatesEcosystems(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonEcosystemsDisabled: true});
        } else {
            this.setState({isPrevButtonEcosystemsDisabled: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonEcosystemsDisabled: true});
        } else {
            this.setState({isNextButtonEcosystemsDisabled: false});
        }
    }

    updateButtonStatesAnti(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonDisabledAnti: true});
        } else {
            this.setState({isPrevButtonDisabledAnti: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonDisabledAnti: true});
        } else {
            this.setState({isNextButtonDisabledAnti: false});
        }
    }

    handlePrev() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slidePrev();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }

    handleNext() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slideNext();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }

    handlePrevAnti() {
        if (this.swiperRefAnti.current && this.swiperRefAnti.current.swiper) {
            this.swiperRefAnti.current.swiper.slidePrev();
            this.updateButtonStatesAnti(this.swiperRefAnti.current.swiper);
        }
    }

    handleNextAnti() {
        if (this.swiperRefAnti.current && this.swiperRefAnti.current.swiper) {
            this.swiperRefAnti.current.swiper.slideNext();
            this.updateButtonStatesAnti(this.swiperRefAnti.current.swiper);
        }
    }

    handlePrevEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slidePrev();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }

    handleNextEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slideNext();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }

    handleSwiperSlideChange = (swiper) => {
        this.updateButtonStates(swiper);
    }

    handleSwiperSlideChangeEcosystems = (swiper) => {
        this.updateButtonStatesEcosystems(swiper);
    }

    handleSwiperSlideChangeAnti = (swiper) => {
        this.updateButtonStatesAnti(swiper);
    }

    handleInputChange = (event) => {
        this.setState({query: event.target.value});
    };

    handleSearch = () => {
        console.log('Search query:', this.state.query);
        // Логика обработки поиска
    };

    handleStatusClick = (status) => {
        const {selectedStatus} = this.state;
        if (selectedStatus === status) {
            // Если статус уже выбран, снять выбор
            this.setState({selectedStatus: null});
        } else {
            // Если статус не выбран, установить его как текущий
            this.setState({selectedStatus: status});
        }
    };

    handleChainClick = (chain) => {
        const {selectedChains} = this.state;
        if (selectedChains.includes(chain)) {
            // Если элемент уже выбран, удаляем его из массива
            this.setState({
                selectedChains: selectedChains.filter((selectedChain) => selectedChain !== chain),
            });
        } else {
            // Если элемент не выбран, добавляем его в массив
            this.setState({selectedChains: [...selectedChains, chain]});
        }
    };

    renderSearchBar() {
        return (
            <div className="search-bar-area">
                <div className='search-bar'>
                    <div className='frame-search-bar'>
                        <img src={searchIcon} alt="Search Icon"/>
                    </div>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        placeholder="Search"
                    />
                </div>
            </div>
        );
    }

    renderWelcomeBanner() {
        return (
            <div className='welcome-banner'>
                <div className='welcome-banner-text'>
                    <span>
                        <span
                            className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span">
                            Earn
                        </span>
                        <span
                            className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span2">
                            points
                            <br/>
                        </span>
                        <span
                            className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span3">
                            and
                        </span>
                        <span
                            className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span4">
                            rewards
                            <br/>
                        </span>
                        <span
                            className="earn-points-and-rewards-by-contributing-to-your-favourite-web-3-community-span5">
                            by Contributing to
                            <br/>
                            Your
                            <br/>
                            Favourite Web3
                            <br/>
                            Community
                        </span>
                    </span>
                    {this.renderChainLinks()}
                </div>
                {this.renderWelcomeBannerSlider()}
            </div>
        );
    }

    renderChainLinks() {
        return (
            <div className="chain-link-images">
                <a href="https://www.bnbchain.org" rel="noopener noreferrer">
                    <img className="image-66" src={BNBChain} alt="BNB Chain"/>
                </a>
                <a href="https://polygon.technology" rel="noopener noreferrer">
                    <img className="image-67" src={Polygonchain} alt="Polygon Chain"/>
                </a>
                <a href="https://solana.com" rel="noopener noreferrer">
                    <img className="image-68" src={SolanaChain} alt="Solana Chain"/>
                </a>
                <a href="https://optimism.io" rel="noopener noreferrer">
                    <img className="image-69" src={OPChain} alt="OP Chain"/>
                </a>
                <a href="https://arbitrum.io" rel="noopener noreferrer">
                    <img className="image-70" src={ArbitrumChain} alt="Arbitrum Chain"/>
                </a>
                <a href="https://zebrachain.org" rel="noopener noreferrer">
                    <img className="image-71" src={ZebraChain} alt="Zebra Chain"/>
                </a>
                <a href="https://avax.network" rel="noopener noreferrer">
                    <img className="image-72" src={AvalancheChain} alt="Avalanche Chain"/>
                </a>
                <a href="https://villagerchain.com" rel="noopener noreferrer">
                    <img className="image-73" src={VillagerChain} alt="Villager Chain"/>
                </a>
                <a href="https://scroll.io" rel="noopener noreferrer">
                    <img className="image-74" src={ScroolChain} alt="Scroll Chain"/>
                </a>
                <a href="https://qredo.com" rel="noopener noreferrer">
                    <img className="image-75" src={QredoChain} alt="Qredo Chain"/>
                </a>
            </div>
        );
    }

    renderWelcomeBannerSlider() {
        const slideDataWelcomeBanner = [
            {
                imageSrc: questCard1QuestPic,
                altText: "Image 1",
                title: "XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1",
                companyName: "XRP Ledger",
                companyLogo: company1CardPic,
                link: "https://qredo.com"
            },
            {
                imageSrc: questCard2QuestPic,
                altText: "Image 2",
                title: "Ethereum Quest - Unlock Unique Tokens and Rewards",
                companyName: "Ethereum",
                companyLogo: company2CardPic,
                link: "https://ethereum.org"
            },
            {
                imageSrc: questCard3QuestPic,
                altText: "Image 3",
                title: "Polkadot Journey - Earn Staking Rewards",
                companyName: "Polkadot",
                companyLogo: company3CardPic,
                link: "https://polkadot.network"
            },
        ];
        return (
            <div className='welcome-banner-slider'>
                <div className='slide-indicators'>
                    {slideDataWelcomeBanner.map((_, index) => (
                        <div key={index} className={`indicator ${this.state.activeSlide === index ? 'active' : ''}`}></div>
                    ))}
                </div>
                <div className='welcome-banner-slider-swiper'>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        centeredSlides={false}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        loop={true}
                        grabCursor={true}
                        onSlideChange={(swiper) => this.setState({ activeSlide: swiper.realIndex })}
                        className='mySwiper'
                    >
                        {slideDataWelcomeBanner.map((slide, index) => (
                            <SwiperSlide key={index}>
                                {this.renderSlide(
                                    slide.imageSrc,
                                    slide.altText,
                                    slide.title,
                                    slide.companyName,
                                    slide.companyLogo,
                                    slide.link
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        );
    }

    renderSlide(imageSrc, altText, title, companyName, companyLogo, link) {
        return (
            <a href={link} rel="noopener noreferrer" target="_blank" className='slide'>
                <div className='slide-img'>
                    <img src={imageSrc} alt={altText}/>
                </div>
                <div className='quests-pic-name-company'>
                    <img src={companyLogo} alt='pic-project'/>
                    <p>{companyName}</p>
                </div>
                <p className='quests-slide-text-name-quest'>{title}</p>
            </a>
        );
    }


    renderSidebarFilters() {
        const {selectedStatus, selectedChains} = this.state;
        return (
            <div className="sidebarFilters">
                <div className="sort-by">
                    <label htmlFor="sortSelect">Sort by</label>
                    <select id="sortSelect">
                        <option value="lastAdded">Last Added</option>
                        <option value="expiringDate">Expiring Date</option>
                    </select>
                </div>
                <div className="status">
                    <label>Status</label>
                    <div
                        className={`status-tile ${selectedStatus === 'recommended' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('recommended')}
                    >
                        Recommended
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'inProgress' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('inProgress')}
                    >
                        In Progress
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'new' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('new')}
                    >
                        New
                    </div>
                </div>
                <div className="chain">
                    <label>Chain</label>
                    <div className="scroll-menu">
                        <div
                            className={`chain-tile ${selectedChains.includes('bnbChain') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('bnbChain')}
                        >
                            BNB Chain
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('opMainnet') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('opMainnet')}
                        >
                            OP Mainnet
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('scroll') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('scroll')}
                        >
                            Scroll
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('arbitrum') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            Arbitrum
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('avax') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('avax')}
                        >
                            Avalanche
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Polygon') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Polygon')}
                        >
                            Polygon
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Qredo') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Qredo')}
                        >
                            Qredo
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Solana') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Solana')}
                        >
                            Solana
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Villager') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Villager')}
                        >
                            Villager
                        </div>
                        <div
                            className={`chain-tile ${selectedChains.includes('Zebra') ? 'selected' : ''}`}
                            onClick={() => this.handleChainClick('Zebra')}
                        >
                            Zebra
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSidebarProgressXP() {
        const {userAccount} = this.state
        if (userAccount) {
            const expPoints = userAccount['experience'];
            return (
                <Link
                    to={profilePath}
                    className="sidebarProgressXP"
                >
                    <div className="quest-pentagon-container">
                        <div className="quest-pentagon-white">
                            <div className="quest-pentagon-black">
                                <div className="quest-grade-number">1</div>
                            </div>
                        </div>
                    </div>
                    <div className='sidebarProgressXP-score-points'>
                        <div className='sidebarProgressXP-score-points-text'>
                            <p>Collected {expPoints} exp</p>
                            <p>Complete quests and get exp</p>
                        </div>
                    </div>
                    <div className='sidebarProgressXP-score-points-arrowNext'>
                        <img src={arrow} alt="Next"/>
                    </div>
                </Link>
            );
        }
    }

    render() {
        return (
            <div className='quests-page'>
                {this.renderSearchBar()}
                {this.renderWelcomeBanner()}
                <div className="main-part-of-quest-page">
                    {renderContent({
                        handlePrev: this.handlePrev,
                        handleNext: this.handleNext,
                        handlePrevEcosystems: this.handlePrevEcosystems,
                        handleNextEcosystems: this.handleNextEcosystems,
                        handlePrevAnti: this.handlePrevAnti,
                        handleNextAnti: this.handleNextAnti,
                        swiperRef: this.swiperRef,
                        swiperRefEcosystems: this.swiperRefEcosystems,
                        swiperRefAnti: this.swiperRefAnti,
                        isPrevButtonDisabled: this.state.isPrevButtonDisabled,
                        isNextButtonDisabled: this.state.isNextButtonDisabled,
                        isPrevButtonEcosystemsDisabled: this.state.isPrevButtonEcosystemsDisabled,
                        isNextButtonEcosystemsDisabled: this.state.isNextButtonEcosystemsDisabled,
                        isPrevButtonDisabledAnti: this.state.isPrevButtonDisabledAnti,
                        isNextButtonDisabledAnti: this.state.isNextButtonDisabledAnti,
                        handleSwiperSlideChange: this.handleSwiperSlideChange,
                        handleSwiperSlideChangeEcosystems: this.handleSwiperSlideChangeEcosystems,
                        handleSwiperSlideChangeAnti: this.handleSwiperSlideChangeAnti,
                    })}
                    <div className='quest-filter-container'>
                        {this.renderSidebarFilters()}
                        {this.state.userAccount ? (<p className='MyProgressLabel'>My Progress</p>) : null}
                        {this.renderSidebarProgressXP()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;
