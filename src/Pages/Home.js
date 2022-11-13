import React from "react";
import { Navbar } from "../Components/Navbar";
import HeroOne from "../Images/hero1.png";
import HeroTwo from "../Images/hero2.png";
import HeroThree from "../Images/hero3.png";
import HeroFour from "../Images/hero4.png";
import MBToken from "../Assets/mbtoken.svg";
import OpenSea from "../Assets/openseaLogo.svg";
import Metamask from "../Assets/metamaskLogo.svg";
import Stars from "../Assets/stars-multiple.png";
import ImageOne from "../Images/image1.png";
import ImageTwo from "../Images/image2.png";
import ImageThree from "../Images/image3.png";
import ImageFour from "../Images/image4.png";
import ImageFive from "../Images/image5.png";
import ImageSix from "../Images/image6.png";
import ImageSeven from "../Images/image7.png";
import ImageEight from "../Images/image8.png";
import MetaImage from "../Images/nft-multiple.png";

const NFTCards = [
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageOne,
    id: "one",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageTwo,
    id: "two",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageThree,
    id: "three",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageFour,
    id: "four",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageFive,
    id: "five",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageSix,
    id: "six",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageSeven,
    id: "seven",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageEight,
    id: "eight",
  },
];

const NFTImages = (props) => {
  const { title, rates, distance, avail, star, NftImages } = props.nfts;
  return (
    <React.Fragment>
      <article className="nft-card">
        <div className="nft-images">
          <img src={NftImages} alt="nft building" className="nft" />
        </div>
        <div className="nft-info">
          <h4 className="nft-title">{title}</h4>
          <p className="nft-rates">{rates}</p>
        </div>
        <div className="nft-distance">
          <p className="distance">{distance}</p>
          <p className="avail">{avail}</p>
        </div>
        <div className="star-cont">
          <img src={star} alt="five star rating" className="star" />
        </div>
      </article>
    </React.Fragment>
  );
};

function Home() {
  return (
    <section>
      <div className="section-center">
        <Navbar />
        <div className="hero-center">
          <div className="hero-text">
            <h1 className="title">
              Rent a <span className="title-clr">place</span> away from{" "}
              <span className="title-clr">home</span> in the{" "}
              <span className="title-clr">metaverse</span>
            </h1>
            <p className="hero-info">
              we provide you access to luxury and affordable houses in the
              metaverse, get a chance to turn your imagination to reality at
              your comfort zone
            </p>
            <form action="">
              <div className="form-cont">
                <input
                  type="text"
                  className="location"
                  placeholder="Search for location"
                />
                <input
                  className="btn search-btn"
                  type="button"
                  value="Search"
                />
              </div>
            </form>
          </div>
          <div className="hero-images">
            <div className="images-center">
              <div className="hero-one">
                <img src={HeroOne} className="hero-img" alt="nft house" />
              </div>
              <div className="hero-two">
                <img src={HeroTwo} className="hero-img" alt="nft house" />
              </div>
              <div className="hero-three">
                <img src={HeroThree} className="hero-img" alt="nft house" />
              </div>
              <div className="hero-four">
                <img src={HeroFour} className="hero-img" alt="nft house" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-footer">
        <img src={MBToken} alt="" className="tokens" />
        <img src={Metamask} alt="" className="tokens" />
        <img src={OpenSea} alt="" className="tokens" />
      </div>
      <section className="nft-section">
        <div className="section-center">
          <h2 className="small-title">Inspiration for your next adventure</h2>
          <div className="nft-center">
            {NFTCards.map((card) => {
              return <NFTImages key={card.id} nfts={card} />;
            })}
          </div>
        </div>
      </section>
      <section className="meta">
        <div className="section-center">
          <div className="meta-center">
            <div className="meta-text">
              <h3 className="meta-title">Metabnb NFTs</h3>
              <p className="meta-info">
                Discover our NFT gift cards collection. Loyal customers gets
                amazing gift cards which are traded as NFTs. These NFTs gives
                our cutomer access to loads of our exclusive services.
              </p>
              <div className="div btn-cont">
                <button type="button" className="meta-button btn">
                  Learn more
                </button>
              </div>
            </div>
            <div className="meta-image">
              <img src={MetaImage} alt="" className="meta-img" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
export default Home;
