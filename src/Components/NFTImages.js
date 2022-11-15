import React from "react";

export const NFTImages = (props) => {
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

export default NFTImages;
