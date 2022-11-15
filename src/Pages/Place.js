import React from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { NFTImages } from "../Components/NFTImages";
import { Sidebar } from "../Components/Sidebar";
import { Modal } from "../Components/Modal";
import Stars from "../Assets/stars-multiple.png";
import ImageOne from "../Images/image1.png";
import ImageTwo from "../Images/image2.png";
import ImageThree from "../Images/image3.png";
import ImageFour from "../Images/image4.png";
import ImageFive from "../Images/image5.png";
import ImageSix from "../Images/image6.png";
import ImageSeven from "../Images/image7.png";
import ImageEight from "../Images/image8.png";
import ImageNine from "../Images/image9.png";
import ImageTen from "../Images/image10.png";
import ImageEleven from "../Images/image11.png";
import ImageTwelve from "../Images/image12.png";
import ImageThirteen from "../Images/image13.png";
import ImageForteen from "../Images/image14.png";
import ImageFifteen from "../Images/image15.png";
import ImageSixteen from "../Images/image16.png";

import Settings from "../Assets/settings.svg";

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
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageNine,
    id: "nine",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageTen,
    id: "ten",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageEleven,
    id: "eleven",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageTwelve,
    id: "twelve",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageThirteen,
    id: "thirteen",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageForteen,
    id: "forteen",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageFifteen,
    id: "fifteen",
  },
  {
    title: "Desert King",
    rates: "1MBT per night",
    distance: "2345km away",
    avail: "available for 2 weeks stay",
    star: Stars,
    NftImages: ImageSixteen,
    id: "sixteen",
  },
];

function Place() {
  return (
    <section className="section">
      <div className="section-center">
        <Navbar />
        <div className="section-center">
          <div className="place">
            <h4 className="place-links">Restaurant</h4>
            <h4 className="place-links">Cottage</h4>
            <h4 className="place-links">Castle</h4>
            <h4 className="place-links">Fantasy City</h4>
            <h4 className="place-links">Beach</h4>
            <h4 className="place-links">Cabins</h4>
            <h4 className="place-links">Off-grid</h4>
            <h4 className="place-links">Farm</h4>
            <div className="settings-cont">
              <p className="loc-settings">Location</p>
              <img src={Settings} alt="" className="loc-img" />
            </div>
          </div>
        </div>
      </div>
      <div className="section-center">
        <div className="nft-center place-nft">
          {NFTCards.map((card) => {
            return <NFTImages key={card.id} nfts={card} />;
          })}
        </div>
      </div>
      <div className="footer-place">
        <Footer />
      </div>
      <Sidebar />
      <Modal />
    </section>
  );
}
export default Place;
