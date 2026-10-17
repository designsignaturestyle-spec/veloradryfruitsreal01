export const BRAND = {
  name: "Velora Dry Fruits",
  tagline: "We wish you a Happy and Healthiest Lifestyle!",
  subTagline: "Premium Quality • Better Health • Better Life",
  phone: "9739323112",
  phoneIntl: "+919739323112",
  whatsappNumber: "919739323112",
  email: "veloradryfruits@gmail.com",
  instagram: "https://www.instagram.com/veloradryfruits/",
  logo:
    "https://customer-assets.emergentagent.com/job_843794e4-a856-4ece-81c5-277fa972fcef/artifacts/vrne76i3_WhatsApp%20Image%202026-07-05%20at%201.09.32%20PM.jpeg",
  address: {
    line1: "Near Meghana Foods",
    line2: "Opposite to Shopping City",
    line3: "Rajarajeshwari Nagar, Bengaluru",
  },
  mapsUrl: "https://maps.app.goo.gl/ndfhqUuhyp3iPepaA?g_st=iw",
  digitaraLogo:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/lqsvrwz9_digitara%20white%20logo.png",
};

export const waLink = (productName) => {
  const msg = productName
    ? `Hello Velora Dry Fruits,%0AI would like to order:%0A${encodeURIComponent(
        productName
      )}`
    : "Hello%20Velora%20Dry%20Fruits%2C%20I%20would%20like%20to%20place%20an%20order.";
  return `https://wa.me/${BRAND.whatsappNumber}?text=${msg}`;
};

export const callLink = `tel:${BRAND.phoneIntl}`;
export const mailLink = `mailto:${BRAND.email}`;
