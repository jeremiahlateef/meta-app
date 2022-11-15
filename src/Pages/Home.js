import React from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { NFTImages } from "../Components/NFTImages";
import { Sidebar } from "../Components/Sidebar";
import { Modal } from "../Components/Modal";
import { useGlobalContext } from "../context";

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
import Desktop from "../Images/desktop-image.png";

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

function Home() {
  const data = useGlobalContext();
  console.log(data);
  return (
    <section className="section">
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
            <div className="desktop-container">
              <img src={Desktop} alt="nfts" className="desktop-image" />
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
              <div className="btn-cont">
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
      <Footer />
      <Sidebar />
      <Modal />
    </section>
  );
}
export default Home;
