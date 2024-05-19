const products = [
  {
    name: "Superior Sound: Shop Sonic Excellence Headphones.",
    image: [
      { img: "/images/headphone3.png" },
      { img: "/images/headphone2.png" },
      { img: "/images/headphone3.png" },
      { img: "/images/headphone2.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "130",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "2GB",
      durability: "sweat proof",
      colour: "Black",
      Ram: "5gb",
      Sound: "Loud",
      connectivity: "dual",
    },
    expiryDate: "2024-03-15", // Example expiry date
  },

  {
    name: "Experience Next-Gen Gaming with PlayStation 5",
    image: [
      { img: "/images/game1.png" },
      { img: "/images/game3.png" },
      { img: "/images/game1.png" },
      { img: "/images/game3.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "750",
    countInStock: "36",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "2GB",
      Speed: "Ultra-High-Speed SSD:",
      colour: "white",
      Ram: "5gb",
      Audio: "3D Audio Technology",
      Screen: "4K and HDR Supporty",
    },
    expiryDate: "2024-04-15",
  },
  {
    name: "Ultimate Sound: Headphones for Immersive Audio",
    image: [
      { img: "/images/game3.png" },
      { img: "/images/game1.png" },
      { img: "/images/game3.png" },
      { img: "/images/game1.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "4GB",
      Speed: "Ultra-High-Speed SSD:",
      colour: "black",
      Ram: "6gb",
      Audio: "3D Audio Technology",
      Screen: "4K and HDR Supporty",
    },
    expiryDate: "2024-04-15",
  },

  {
    name: "Sound On-The-Go: Explore Our Headphone Collection",
    image: [
      { img: "/images/game2.png" },
      { img: "/images/gaming.png" },
      { img: "/images/game2.png" },
      { img: "/images/gaming.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "270",
    countInStock: "16",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "Microsoft",
    isFeatured: true,
    properties: {
      capacity: "2GB",
      Speed: "Ultra-High-Speed SSD:",
      colour: "white",
      Ram: "5gb",
      Audio: "3D Audio Technology",
      Screen: "4K and HDR Supporty",
    },
    expiryDate: "2024-03-30",
  },

  {
    name: "Elevate Gaming: Find Ultimate Game Kit Today.",
    image: [
      { img: "/images/kit1.png" },
      { img: "/images/kit1.png" },
      { img: "/images/kit1.png" },
      { img: "/images/kit1.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    properties: {
      capacity: "2GB",
      Compatibility: "Xbox",
      colour: "multi-colored",
      Ram: "5gb",
    },
    expiryDate: "2024-04-15",
  },

  {
    name: "Unleash the Power of Gaming with Xbox",
    image: [
      { img: "/images/xbox1.png" },
      { img: "/images/xbox2.png" },
      { img: "/images/xbox1.png" },
      { img: "/images/xbox2.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-15",
  },
  {
    name: "Unleash the Power of Gaming with Xbox",
    image: [
      { img: "/images/xbox2.png" },
      { img: "/images/xbox1.png" },
      { img: "/images/xbox2.png" },
      { img: "/images/xbox1.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isBest: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-17",
  },
  {
    name: "Unleash the Power of Gaming with Xbox",
    image: [
      { img: "/images/xbox4.png" },
      { img: "/images/xbox3.png" },
      { img: "/images/xbox4.png" },
      { img: "/images/xbox3.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-17",
  },
  {
    name: "Unleash the Power of Gaming with Xbox",
    image: [
      { img: "/images/xbox3.png" },
      { img: "/images/xbox4.png" },
      { img: "/images/xbox3.png" },
      { img: "/images/xbox4.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-17",
  },
  {
    name: "Gaming pad Bulk 10 pack multi colored",
    image: [
      { img: "/images/pes2.png" },
      { img: "/images/pes2.png" },
      { img: "/images/pes2.png" },
      { img: "/images/pes2.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-17",
  },

  {
    name: "Elevate Gaming: Find Ultimate Game Kit Today",
    image: [
      { img: "/images/kit2.jpg" },
      { img: "/images/kit2.jpg" },
      { img: "/images/kit2.jpg" },
      { img: "/images/kit2.jpg" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "6GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-03-30",
  },
  {
    name: "Effortless Data Transfer: Explore Our USB Solutions",
    image: [
      { img: "/images/usb.png" },
      { img: "/images/usb.png" },
      { img: "/images/usb.png" },
      { img: "/images/usb.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "40",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150d672f15ee13e9de2807"],
    brand: "Infinix",
    isFeatured: true,
    isBest: true,
    properties: {
      capacity: "2GB",
      Style: "Alarm clock",
      colour: "white",
      Ram: "5gb",
    },
    expiryDate: "2024-04-18",
  },
  {
    name: "PES 5: Experience the Ultimate Soccer Game",
    image: [
      { img: "/images/game4.png" },
      { img: "/images/game1.png" },
      { img: "/images/game4.png" },
      { img: "/images/game1.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "200",
    countInStock: "46",
    category: ["641509142f15ee13e9de26bd", "64150fa12f15ee13e9de299d"],
    brand: "apple",
    isBest: true,
    properties: {
      capacity: "2GB",
      Speed: "Ultra-High-Speed SSD:",
      colour: "white",
      Ram: "5gb",
      Audio: "3D Audio Technology",
      Screen: "4K and HDR Supporty",
    },
    expiryDate: "2024-04-18",
  },

  {
    name: "Cool Style: Explore Our Trendy Shorts Collection",
    image: [
      { img: "/images/short1.png" },
      { img: "/images/short2.png" },
      { img: "/images/short1.png" },
      { img: "/images/short2.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy 
        text ever since the 1500s, when an unknown printer 
        took a galley of type and scrambled it to make a type 
        specimen book.`,
    price: "50",
    countInStock: "46",
    category: ["6414508d5cb15363b0ee766b", "64143ca37d1f31516959043a"],
    brand: "Apple",
    properties: {
      quality: "Comfortable Fabric",
      Style: "Stylish Designs",
      colour: "multi-colored",
      type: "shorts",
    },
    expiryDate: "2024-04-17",
  },
  {
    name: "Cool Style: Explore Our Trendy Shorts Collection.",
    image: [
      { img: "/images/short2.png" },
      { img: "/images/short1.png" },
      { img: "/images/short2.png" },
      { img: "/images/short1.png" },
      ,
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy 
      text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type 
      specimen book.`,
    price: "100",
    countInStock: "126",
    category: ["64150b732f15ee13e9de2745"],
    brand: "apple",
    properties: {
      quality: "Comfortable Fabric",
      Style: "Stylish Designs",
      colour: "multi-colored",
      type: "shorts",
    },
    expiryDate: "2024-04-15",
  },
  {
    name: "Style & Comfort: Explore Premium Shirt Collection",
    image: [
      { img: "/images/shirt1.png" },
      { img: "/images/shirt2.png" },
      { img: "/images/shirt1.png" },
      { img: "/images/shirt2.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy 
      text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type 
      specimen book.`,
    price: "30",
    countInStock: "86",
    category: ["64150b732f15ee13e9de2745"],
    brand: "samsung",
    properties: {
      Type: "Sweater",
      Style: "Long-sleeve",
      Color: "Black",
      Brand: "Gucci",
    },
    expiryDate: "2024-03-30",
  },

  {
    name: "Elevate Style: Discover Exceptional Shirt Collection",
    image: [
      { img: "/images/shirt2.png" },
      { img: "/images/shirt1.png" },
      { img: "/images/shirt2.png" },
      { img: "/images/shirt1.png" },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy 
    text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type 
    specimen book.`,
    price: "450",
    countInStock: "46",
    category: ["64150b732f15ee13e9de2745"],
    brand: "apple",
    isFeatured: true,
    properties: {
      Type: "T-shirt",
      Style: "Short-sleeve",
      Color: "Gray",
      Brand: "Dior",
    },
    expiryDate: "2024-03-30",
  },
];
export default products;
