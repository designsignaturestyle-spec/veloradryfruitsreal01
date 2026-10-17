import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import ProductDetail from "@/pages/ProductDetail";
import HamperBuilder from "@/pages/HamperBuilder";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/build-hamper" element={<HamperBuilder />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
