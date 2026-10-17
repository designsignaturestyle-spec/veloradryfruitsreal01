import { waLink } from "@/data/constants";

export const FloatingWhatsApp = () => (
  <a
    href={waLink()}
    target="_blank"
    rel="noreferrer"
    data-testid="floating-whatsapp"
    className="float-wa"
    aria-label="Order on WhatsApp"
  >
    <i className="fab fa-whatsapp text-3xl" />
  </a>
);
