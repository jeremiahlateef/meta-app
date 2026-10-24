import nftOne from "../Images/metanft1.png";
import nftTwo from "../Images/metanft2.png";
import nftThree from "../Images/metanft3.png";

export const NFT_TIERS = [
  {
    id: "gaming-den",
    name: "Gaming Den",
    tier: "Starter",
    price: "0.5 MBT",
    image: nftOne,
    alt: "Isometric illustration of a tilted purple gaming room with a large screen on the wall, a sofa and a plant.",
    perks: ["5% off every stay", "Early access to new places", "Member badge on your profile"],
  },
  {
    id: "study-nook",
    name: "Study Nook",
    tier: "Explorer",
    price: "1.5 MBT",
    image: nftTwo,
    alt: "Isometric cutaway of a cosy study with a desk, chairs, a map on the wall and shelves.",
    perks: ["10% off every stay", "Free late checkout", "Invites to member events"],
  },
  {
    id: "skyloft-kitchen",
    name: "Skyloft Kitchen",
    tier: "Founder",
    price: "3 MBT",
    image: nftThree,
    alt: "Isometric cutaway of a bright orange and white kitchen with a round pod chair and a staircase.",
    perks: ["15% off every stay", "Priority booking", "A vote on which places are added next"],
  },
];
