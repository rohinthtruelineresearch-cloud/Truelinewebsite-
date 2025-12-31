import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollPageControls from "./components/ScrollPageControls";
import ChatbotWidget from "./components/ChatbotWidget";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import JournalsPublishing from "./pages/JournalsPublishing";
import IprPatents from "./pages/IprPatents";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/AdminDashboard";
import { getHealthStatus } from "./lib/api";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const skipNextRouteLoader = useRef(true);

  useEffect(() => {
    getHealthStatus()
      .then((payload) => {
        console.info("API health check", payload);
      })
      .catch((error) => {
        console.error("API health check failed", error);
      });
  }, []);

  useEffect(() => {
    let loadTimeout;
    const handleAppLoaded = () => {
      window.clearTimeout(loadTimeout);
      loadTimeout = window.setTimeout(() => setIsLoading(false), 320);
    };

    if (document.readyState === "complete") {
      handleAppLoaded();
    } else {
      window.addEventListener("load", handleAppLoaded);
    }

    return () => {
      window.removeEventListener("load", handleAppLoaded);
      window.clearTimeout(loadTimeout);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (skipNextRouteLoader.current) {
      skipNextRouteLoader.current = false;
      return;
    }

    setIsLoading(true);
    const routeTimeout = window.setTimeout(() => setIsLoading(false), 420);

    return () => window.clearTimeout(routeTimeout);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("page-loader-active");
    } else {
      document.body.classList.remove("page-loader-active");
    }

    return () => {
      document.body.classList.remove("page-loader-active");
    };
  }, [isLoading]);

  return (
    <>
      <PageLoader visible={isLoading} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/journals-publishing" element={<JournalsPublishing />} />
        <Route path="/ipr-patents" element={<IprPatents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <ScrollPageControls />
      {/* <ChatbotWidget /> */}
      <Footer />
    </>
  );
}

export default App;
