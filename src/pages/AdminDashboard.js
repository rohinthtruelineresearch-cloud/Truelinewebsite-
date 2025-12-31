import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";

export default function AdminDashboard() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    author: "",
    category: "",
    content: "",
    isFeatured: false,
    isSpotlight: false,
  });

  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'manage'
  const [editingId, setEditingId] = useState(null);

  const [events, setEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    tag: "",
    description: "",
    date: "",
    accent: "#8B5CF6"
  });
  const [editingEventId, setEditingEventId] = useState(null);
  
  const [resources, setResources] = useState([]);
  const [resourceFormData, setResourceFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "", 
    icon: "FileText",
    linkText: "Read More",
    linkUrl: "/contact"
  });
  const [editingResourceId, setEditingResourceId] = useState(null);
  
  const [products, setProducts] = useState([]);
  const [productFormData, setProductFormData] = useState({
      title: "",
      description: "",
      tag: "",
      accent: "#22D3EE",
      imageUrl: "",
      linkUrl: "#"
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const [highlights, setHighlights] = useState([]);
  const [highlightFormData, setHighlightFormData] = useState({
      title: "",
      images: ""
  });
  const [editingHighlightId, setEditingHighlightId] = useState(null);

  const [programmes, setProgrammes] = useState([]);
  const [programmeFormData, setProgrammeFormData] = useState({
      title: "",
      date: "",
      summary: ""
  });
  const [editingProgrammeId, setEditingProgrammeId] = useState(null);

  const [showcases, setShowcases] = useState([]);
  const [showcaseFormData, setShowcaseFormData] = useState({
      name: "",
      logoUrl: "",
      location: "",
      category: "UNIVERSITY"
  });
  const [editingShowcaseId, setEditingShowcaseId] = useState(null);

  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    // Check if previously logged in (optional persistence)
     const token = sessionStorage.getItem("adminToken");
     if (token) {
         fetch(`${API_BASE_URL}/api/auth/verify`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ token })
         })
         .then(res => res.json())
         .then(data => {
             if(data.isValid) setIsAuthenticated(true);
             else {
                 sessionStorage.removeItem("adminToken");
                 sessionStorage.removeItem("adminAuth");
                 setIsAuthenticated(false);
             }
         })
         .catch((err) => {
             console.error(err);
             setIsAuthenticated(false); 
         });
     }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
        fetchPosts();
        fetchEvents();
        fetchResources();
        fetchProducts();
        fetchHighlights();
        fetchProgrammes();
        fetchProgrammes();
        fetchShowcases();
        fetchSubscribers();
    }
  }, [isAuthenticated]);

  const getImageUrl = (url) => {
    if(!url) return "";
    if(url.startsWith('http')) return url;
    return `${API_BASE_URL}/${url}`;
  };

  const fetchPosts = () => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setBlogPosts(data);
          else setBlogPosts([]);
      })
      .catch((err) => console.error("Failed to fetch blog posts:", err));
  };
  
  const fetchEvents = () => {
      fetch(`${API_BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setEvents(data);
          else setEvents([]);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }

  const fetchResources = () => {
    fetch(`${API_BASE_URL}/api/resources`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setResources(data);
          else setResources([]);
      })
      .catch((err) => console.error("Failed to fetch resources:", err));

  }

  const fetchProducts = () => {
      fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setProducts(data);
          else setProducts([]);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }

  const fetchHighlights = () => {
      fetch(`${API_BASE_URL}/api/event-highlights`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setHighlights(data);
          else setHighlights([]);
      })
      .catch((err) => console.error("Failed to fetch highlights:", err));
  }

  const fetchProgrammes = () => {
      fetch(`${API_BASE_URL}/api/hosted-programmes`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setProgrammes(data);
          else setProgrammes([]);
      })
      .catch((err) => console.error("Failed to fetch programmes:", err));
  }

  const fetchShowcases = () => {
      fetch(`${API_BASE_URL}/api/showcases`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setShowcases(data);
          else setShowcases([]);
      })
      .catch((err) => console.error("Failed to fetch showcases:", err));
  }

  const fetchSubscribers = () => {
    fetch(`${API_BASE_URL}/api/subscribers`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setSubscribers(data);
          else setSubscribers([]);
      })
      .catch((err) => console.error("Failed to fetch subscribers:", err));
  }

  const handleImageUpload = async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
          const res = await fetch(`${API_BASE_URL}/api/upload`, {
              method: 'POST',
              body: formData
          });
          const data = await res.json();
          if(res.ok) {
              return data.fullUrl || data.file; 
          } else {
              alert(data.msg || "Upload failed");
              return null;
          }
      } catch (err) {
          console.error("Error uploading image:", err);
          alert("Error uploading image");
          return null;
      }
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await res.json();
        
        if (res.ok) {
            setIsAuthenticated(true);
            setError("");
            sessionStorage.setItem("adminToken", data.token);
             sessionStorage.setItem("adminAuth", "true");
        } else {
            setError(data.msg || "Incorrect password");
        }
    } catch (err) {
        setError("Login failed");
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem("adminAuth");
      sessionStorage.removeItem("adminToken");
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEventChange = (e) => {
      const { name, value } = e.target;
      setEventFormData({
          ...eventFormData,
          [name]: value
      });
  }

  const handleResourceChange = (e) => {
      const { name, value } = e.target;
      setResourceFormData({
          ...resourceFormData,
          [name]: value
      });
  }

  const handleProductChange = (e) => {
      const { name, value } = e.target;
      setProductFormData({
          ...productFormData,
          [name]: value
      });
  }

  const handleHighlightChange = (e) => {
      const { name, value } = e.target;
      setHighlightFormData({
          ...highlightFormData,
          [name]: value
      });
  }

  const handleShowcaseChange = (e) => {
      const { name, value } = e.target;
      setShowcaseFormData({
          ...showcaseFormData,
          [name]: value
      });
  }

  const handleProgrammeChange = (e) => {
      const { name, value } = e.target;
      setProgrammeFormData({
          ...programmeFormData,
          [name]: value
      });
  }

  const resetForm = () => {
       setFormData({
        title: "",
        summary: "",
        author: "",
        category: "",
        content: "",
        isFeatured: false,
        isSpotlight: false,
      });
      setEditingId(null);
  }

  const resetEventForm = () => {
      setEventFormData({
        title: "",
        tag: "",
        description: "",
        date: "",
        accent: "#8B5CF6"
      });
      setEditingEventId(null);
  }

  const resetResourceForm = () => {
      setResourceFormData({
        title: "",
        description: "",
        longDescription: "",
        category: "",
        icon: "FileText",
        linkText: "Read More",
        linkUrl: "/contact"
      });
      setEditingResourceId(null);
  }

  const resetProductForm = () => {
      setProductFormData({
        title: "",
        description: "",
        tag: "",
        accent: "#22D3EE",
        imageUrl: "",
        linkUrl: "#"
      });
      setEditingProductId(null);
  }

  const resetHighlightForm = () => {
      setHighlightFormData({
          title: "",
          images: ""
      });
      setEditingHighlightId(null);
  }

  const resetProgrammeForm = () => {
      setProgrammeFormData({
          title: "",
          date: "",
          summary: ""
      });
      setEditingProgrammeId(null);
  }

  const resetShowcaseForm = () => {
      setShowcaseFormData({
          name: "",
          logoUrl: "",
          location: "",
          category: "UNIVERSITY"
      });
      setEditingShowcaseId(null);
  }

  const handleStartEdit = (post) => {
      setFormData({
          ...post,
          content: Array.isArray(post.content) ? post.content.join("\n\n") : post.content
      });
      setEditingId(post._id);
      setActiveTab("create"); 
  }

  const handleStartEditEvent = (event) => {
      setEventFormData(event);
      setEditingEventId(event._id);
      setActiveTab("events");
  }

  const handleStartEditResource = (res) => {
      setResourceFormData(res);
      setEditingResourceId(res._id);
      setActiveTab("resources");
  }

  const handleStartEditProduct = (prod) => {
      setProductFormData(prod);
      setEditingProductId(prod._id);
      setActiveTab("products");
  }

  const handleStartEditHighlight = (hi) => {
      setHighlightFormData({
          ...hi,
          images: hi.images ? hi.images.join("\n") : ""
      });
      setEditingHighlightId(hi._id);
      setActiveTab("highlights");
  }

  const handleStartEditProgramme = (prog) => {
       setProgrammeFormData(prog);
       setEditingProgrammeId(prog._id);
       setActiveTab("programmes");
  }

  const handleStartEditShowcase = (show) => {
       setShowcaseFormData(show);
       setEditingShowcaseId(show._id);
       setActiveTab("showcase");
  }

  const handleDelete = async (id) => {
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/blog/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Post deleted");
              fetchPosts();
          } else {
              alert("Failed to delete");
          }
      } catch (err) {
          console.error(err);
      }
  }

  const handleDeleteEvent = async (id) => {
      if(!window.confirm("Are you sure you want to delete this event?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/events/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Event deleted");
              fetchEvents();
          } else {
               alert("Failed to delete event");
          }
      } catch (err) {
          console.error(err);
      }
  }

  const handleDeleteResource = async (id) => {
      if(!window.confirm("Are you sure you want to delete this resource?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/resources/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Resource deleted");
              fetchResources();
          } else {
               alert("Failed to delete resource");
          }
      } catch (err) {
          console.error(err);
      }
  }



  const handleDeleteHighlight = async (id) => {
      if(!window.confirm("Are you sure you want to delete this highlight?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/event-highlights/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Highlight deleted");
              fetchHighlights();
          } else {
               alert("Failed to delete highlight");
          }
      } catch (err) {
          console.error(err);
      }
  }

  const handleDeleteProduct = async (id) => {
      if(!window.confirm("Are you sure you want to delete this product?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/products/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Product deleted");
              fetchProducts();
          } else {
               alert("Failed to delete product");
          }
      } catch (err) {
          console.error(err);
      }
  }

  const handleDeleteProgramme = async (id) => {
      if(!window.confirm("Are you sure you want to delete this programme?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/hosted-programmes/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Programme deleted");
              fetchProgrammes();
          } else {
               alert("Failed to delete programme");
          }
      } catch (err) {
          console.error(err);
      }
  }

  const handleDeleteShowcase = async (id) => {
      if(!window.confirm("Are you sure you want to delete this showcase entry?")) return;
      try {
          const token = sessionStorage.getItem("adminToken");
          const response = await fetch(`${API_BASE_URL}/api/showcases/${id}`, { 
              method: 'DELETE',
              headers: { "Authorization": `Bearer ${token}` }
            });
          if(response.ok) {
              alert("Showcase removed");
              fetchShowcases();
          } else {
               alert("Failed to delete showcase");
          }
      } catch (err) {
          console.error(err);
      }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API_BASE_URL}/api/blog/${editingId}` : `${API_BASE_URL}/api/blog`;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({
          ...formData,
          content: formData.content.split("\n\n"),
        }),
      });

      if (response.ok) {
        alert(editingId ? "Post updated!" : "Blog post created!");
        resetForm();
        fetchPosts();
      } else {
        alert("Operation failed.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleEventSubmit = async (e) => {
      e.preventDefault();
      const url = editingEventId ? `${API_BASE_URL}/api/events/${editingEventId}` : `${API_BASE_URL}/api/events`;
      const method = editingEventId ? "PUT" : "POST";

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(eventFormData)
          });
          
          if(response.ok) {
              alert(editingEventId ? "Event updated!" : "Event created!");
              resetEventForm();
              fetchEvents();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving event:", error);
      }
  }

  const handleResourceSubmit = async (e) => {
      e.preventDefault();
      const url = editingResourceId ? `${API_BASE_URL}/api/resources/${editingResourceId}` : `${API_BASE_URL}/api/resources`;
      const method = editingResourceId ? "PUT" : "POST";

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(resourceFormData)
          });
          
          if(response.ok) {
              alert(editingResourceId ? "Resource updated!" : "Resource created!");
              resetResourceForm();
              fetchResources();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving resource:", error);
      }

  }

  const handleProductSubmit = async (e) => {
      e.preventDefault();
      const url = editingProductId ? `${API_BASE_URL}/api/products/${editingProductId}` : `${API_BASE_URL}/api/products`;
      const method = editingProductId ? "PUT" : "POST";

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(productFormData)
          });
          
          if(response.ok) {
              alert(editingProductId ? "Product updated!" : "Product created!");
              resetProductForm();
              fetchProducts();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving product:", error);
      }
  }

  const handleHighlightSubmit = async (e) => {
      e.preventDefault();
      const url = editingHighlightId ? `${API_BASE_URL}/api/event-highlights/${editingHighlightId}` : `${API_BASE_URL}/api/event-highlights`;
      const method = editingHighlightId ? "PUT" : "POST";

      const payload = {
          title: highlightFormData.title,
          // Split by newline or comma and filter empty strings
          images: highlightFormData.images.split(/[\n,]+/).map(s => s.trim()).filter(Boolean)
      };

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(payload)
          });
          
          if(response.ok) {
              alert(editingHighlightId ? "Highlight updated!" : "Highlight created!");
              resetHighlightForm();
              fetchHighlights();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving highlight:", error);
      }
  }

  const handleProgrammeSubmit = async (e) => {
      e.preventDefault();
      const url = editingProgrammeId ? `${API_BASE_URL}/api/hosted-programmes/${editingProgrammeId}` : `${API_BASE_URL}/api/hosted-programmes`;
      const method = editingProgrammeId ? "PUT" : "POST";

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(programmeFormData)
          });
          
          if(response.ok) {
              alert(editingProgrammeId ? "Programme updated!" : "Programme created!");
              resetProgrammeForm();
              fetchProgrammes();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving programme:", error);
      }
  }

  const handleShowcaseSubmit = async (e) => {
      e.preventDefault();
      const url = editingShowcaseId ? `${API_BASE_URL}/api/showcases/${editingShowcaseId}` : `${API_BASE_URL}/api/showcases`;
      const method = editingShowcaseId ? "PUT" : "POST";

      try {
          const response = await fetch(url, {
              method: method,
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`
                },
              body: JSON.stringify(showcaseFormData)
          });
          
          if(response.ok) {
              alert(editingShowcaseId ? "Showcase updated!" : "Showcase created!");
              resetShowcaseForm();
              fetchShowcases();
          } else {
              alert("Operation failed");
          }
      } catch (error) {
          console.error("Error saving showcase:", error);
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FA]">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-[#2C3E50] mb-4 text-center">Admin Dashboard Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Enter Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                required
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#008f85] shadow-lg shadow-[#00A99D]/25 transition"
            >
               Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#2C3E50]">Trueline Admin Dashboard</h1>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Logout</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar / Menu */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-2xl shadow p-6">
                    <button 
                        onClick={() => { setActiveTab("create"); resetForm(); }}
                        className={`w-full text-left p-3 rounded-lg mb-2 font-semibold ${activeTab === 'create' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                        + Create New Post
                    </button>
                    <button 
                        onClick={() => setActiveTab("manage")}
                         className={`w-full text-left p-3 rounded-lg font-semibold mb-2 ${activeTab === 'manage' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                        Manage Posts
                    </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("events"); resetEventForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'events' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                         Events & Workshops
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("resources"); resetResourceForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'resources' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                         Tech Resources library
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("highlights"); resetHighlightForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'highlights' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                          Event Highlights
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("programmes"); resetProgrammeForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'programmes' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                          Hosted Programmes
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("showcase"); resetShowcaseForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'showcase' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                          Institutional Showcase
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => { setActiveTab("products"); resetProductForm(); }}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'products' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                         Product Platform
                     </button>
                     <div className="border-t my-2 pt-2"></div>
                     <button 
                         onClick={() => setActiveTab("subscribers")}
                         className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'subscribers' ? 'bg-[#00A99D] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                     >
                         Newsletter Subscribers
                     </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">

                {activeTab === 'resources' && (
                     <div className="space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingResourceId ? 'Edit Resource' : 'Add New Resource'}</h2>
                             <form onSubmit={handleResourceSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Resource Title</label>
                                     <input type="text" name="title" value={resourceFormData.title} onChange={handleResourceChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. Patent Disclosure Template" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Description (Summary)</label>
                                     <textarea name="description" value={resourceFormData.description} onChange={handleResourceChange} rows={2} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Detailed Content (Full Modal Content)</label>
                                     <textarea name="longDescription" value={resourceFormData.longDescription} onChange={handleResourceChange} rows={6} className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="Enter the full content here..." />
                                 </div>

                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Category (e.g. PLAYBOOK)</label>
                                         <input type="text" name="category" value={resourceFormData.category} onChange={handleResourceChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="PLAYBOOK" />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Icon</label>
                                         <select name="icon" value={resourceFormData.icon} onChange={handleResourceChange} className="w-full mt-1 rounded-xl border p-2 border-gray-300 bg-white">
                                             <option value="FileText">Document</option>
                                             <option value="Shield">Shield (Security)</option>
                                             <option value="Zap">Zap (Speed/Tech)</option>
                                             <option value="BarChart">Chart (Analytics)</option>
                                             <option value="Users">Users (Team)</option>
                                             <option value="Globe">Globe (Network)</option>
                                         </select>
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Link Text</label>
                                         <input type="text" name="linkText" value={resourceFormData.linkText} onChange={handleResourceChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Link URL</label>
                                         <input type="text" name="linkUrl" value={resourceFormData.linkUrl} onChange={handleResourceChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                     </div>
                                 </div>
                                 <div className="flex justify-end pt-2">
                                     {editingResourceId && <button type="button" onClick={resetResourceForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingResourceId ? 'Update Resource' : 'Add Resource'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Resources</h2>
                              <div className="space-y-4">
                                 {resources.length === 0 ? (
                                     <p className="text-gray-500">No resources found.</p>
                                 ) : (
                                     resources.map(res => (
                                         <div key={res._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                                             <div>
                                                 <div className="flex items-center gap-2 mb-1">
                                                     <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase font-bold">{res.category}</span>
                                                     <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{res.icon}</span>
                                                 </div>
                                                 <h3 className="font-semibold text-[#2C3E50]">{res.title}</h3>
                                                 <p className="text-sm text-gray-500 mt-1">{res.description}</p>
                                                 <div className="mt-2 text-xs text-[#00A99D] font-medium">Link: {res.linkText} ({res.linkUrl})</div>
                                             </div>
                                             <div className="flex gap-2">
                                                 <button onClick={() => handleStartEditResource(res)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Edit</button>
                                                 <button onClick={() => handleDeleteResource(res._id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}
                
                {activeTab === 'programmes' && (
                     <div className="space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingProgrammeId ? 'Edit Programme' : 'Add New Hosted Programme'}</h2>
                             <form onSubmit={handleProgrammeSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Programme Title</label>
                                     <input type="text" name="title" value={programmeFormData.title} onChange={handleProgrammeChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. STARTNET Launch" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Date</label>
                                     <input type="text" name="date" value={programmeFormData.date} onChange={handleProgrammeChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. July 2023 or —" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Summary</label>
                                     <textarea name="summary" value={programmeFormData.summary} onChange={handleProgrammeChange} rows={3} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                 </div>
                                 
                                 <div className="flex justify-end pt-2">
                                     {editingProgrammeId && <button type="button" onClick={resetProgrammeForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingProgrammeId ? 'Update Programme' : 'Add Programme'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Programmes</h2>
                              <div className="space-y-4">
                                 {programmes.length === 0 ? (
                                     <p className="text-gray-500">No programmes found.</p>
                                 ) : (
                                     programmes.map(prog => (
                                         <div key={prog._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                                             <div>
                                                 <div className="flex items-center gap-2 mb-1">
                                                     <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">{prog.date}</span>
                                                 </div>
                                                 <h3 className="font-semibold text-[#2C3E50]">{prog.title}</h3>
                                                 <p className="text-sm text-gray-500 mt-1">{prog.summary}</p>
                                             </div>
                                             <div className="flex gap-2 shrink-0 ml-4">
                                                 <button onClick={() => handleStartEditProgramme(prog)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Edit</button>
                                                 <button onClick={() => handleDeleteProgramme(prog._id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}

                {activeTab === 'showcase' && (
                     <div className="space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingShowcaseId ? 'Edit Showcase Entry' : 'Add Institutional Showcase'}</h2>
                             <form onSubmit={handleShowcaseSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Institution Name</label>
                                     <input type="text" name="name" value={showcaseFormData.name} onChange={handleShowcaseChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. SRM Institute of Science and Technology" />
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Category</label>
                                         <select name="category" value={showcaseFormData.category} onChange={handleShowcaseChange} className="w-full mt-1 rounded-xl border p-2 border-gray-300 bg-white">
                                             <option value="UNIVERSITY">University</option>
                                             <option value="MEDICAL COLLEGE">Medical College</option>
                                             <option value="ENGINEERING COLLEGE">Engineering College</option>
                                             <option value="HOSPITAL">Hospital</option>
                                             <option value="ENTERPRISE">Enterprise / Partner</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Location</label>
                                         <input type="text" name="location" value={showcaseFormData.location} onChange={handleShowcaseChange} className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. Chennai, TN" />
                                     </div>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Logo Image URL</label>
                                     <div className="flex gap-2 mt-1">
                                         <input type="text" name="logoUrl" value={showcaseFormData.logoUrl} onChange={handleShowcaseChange} required className="w-full rounded-xl border p-2 border-gray-300" placeholder="https://..." />
                                         <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium flex items-center">
                                             <span>Upload</span>
                                             <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                 if(e.target.files && e.target.files[0]) {
                                                     const url = await handleImageUpload(e.target.files[0]);
                                                     if(url) setShowcaseFormData(prev => ({...prev, logoUrl: url}));
                                                 }
                                             }} />
                                         </label>
                                     </div>
                                 </div>
                                 {showcaseFormData.logoUrl && (
                                     <div className="mt-2 p-2 border rounded-lg w-fit">
                                          <p className="text-[10px] text-gray-400 mb-1">Preview:</p>
                                          <img src={getImageUrl(showcaseFormData.logoUrl)} alt="Preview" className="h-12 object-contain" />
                                     </div>
                                 )}

                                 <div className="flex justify-end pt-2">
                                     {editingShowcaseId && <button type="button" onClick={resetShowcaseForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingShowcaseId ? 'Update Showcase' : 'Add to Showcase'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Showcase Entries</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {showcases.length === 0 ? (
                                     <p className="text-gray-500 col-span-2">No showcases found.</p>
                                 ) : (
                                     showcases.map(show => (
                                         <div key={show._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-[#F9FBFC]">
                                             <div className="flex items-center gap-4">
                                                  <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center overflow-hidden p-1">
                                                      <img src={getImageUrl(show.logoUrl)} alt={show.name} className="max-h-full max-w-full object-contain" />
                                                  </div>
                                                 <div>
                                                     <h3 className="font-semibold text-[#2C3E50] text-sm">{show.name}</h3>
                                                     <div className="flex gap-2 text-[10px]">
                                                         <span className="text-indigo-600 font-bold">{show.category}</span>
                                                         {show.location && <span className="text-gray-400">| {show.location}</span>}
                                                     </div>
                                                 </div>
                                             </div>
                                             <div className="flex gap-1 shrink-0 ml-4">
                                                 <button onClick={() => handleStartEditShowcase(show)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition" title="Edit">
                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                 </button>
                                                 <button onClick={() => handleDeleteShowcase(show._id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition" title="Delete">
                                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                 </button>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}


                {activeTab === 'highlights' && (
                     <div className="space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingHighlightId ? 'Edit Highlight' : 'Add New Highlight Showcase'}</h2>
                             <form onSubmit={handleHighlightSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Showcase Title</label>
                                     <input type="text" name="title" value={highlightFormData.title} onChange={handleHighlightChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. Future Readiness Showcase" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Image URLs (One per line or comma separated)</label>
                                     <textarea name="images" value={highlightFormData.images} onChange={handleHighlightChange} rows={5} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
                                     <div className="mt-2 flex justify-end">
                                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                                            <span>+ Upload Image</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                if(e.target.files && e.target.files[0]) {
                                                    const url = await handleImageUpload(e.target.files[0]);
                                                    if(url) {
                                                        const current = highlightFormData.images;
                                                        setHighlightFormData(prev => ({
                                                            ...prev, 
                                                            images: current ? current + (current.endsWith('\n') || current === '' ? '' : '\n') + url : url
                                                        }));
                                                    }
                                                }
                                            }} />
                                        </label>
                                     </div>
                                     <p className="text-xs text-gray-500 mt-1">These will be displayed as a gallery.</p>
                                 </div>
                                 
                                 <div className="flex justify-end pt-2">
                                     {editingHighlightId && <button type="button" onClick={resetHighlightForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingHighlightId ? 'Update Highlight' : 'Add Highlight'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Highlights</h2>
                              <div className="space-y-4">
                                 {highlights.length === 0 ? (
                                     <p className="text-gray-500">No highlights found.</p>
                                 ) : (
                                     highlights.map(hi => (
                                         <div key={hi._id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                                             <div className="flex justify-between items-start">
                                                  <div>
                                                     <h3 className="font-semibold text-[#2C3E50]">{hi.title}</h3>
                                                     <p className="text-sm text-gray-500 mt-1">{hi.images ? hi.images.length : 0} images in gallery</p>
                                                 </div>
                                                 <div className="flex gap-2">
                                                     <button onClick={() => handleStartEditHighlight(hi)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Edit</button>
                                                     <button onClick={() => handleDeleteHighlight(hi._id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                                                 </div>
                                             </div>
                                             
                                             {/* Image Grid */}
                                             {hi.images && hi.images.length > 0 && (
                                                <div className="flex gap-2 overflow-x-auto pb-2">
                                                    {hi.images.map((imgUrl, idx) => (
                                                        <img key={idx} src={imgUrl} alt={`Gallery ${idx}`} className="w-16 h-16 object-cover rounded-lg bg-gray-100 border border-gray-200 shrink-0" />
                                                    ))}
                                                </div>
                                             )}
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}


                
                {activeTab === 'products' && (
                     <div className="space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
                             <form onSubmit={handleProductSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Product Title</label>
                                     <input type="text" name="title" value={productFormData.title} onChange={handleProductChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. Web App Suite" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Tag / Badge</label>
                                         <input type="text" name="tag" value={productFormData.tag} onChange={handleProductChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. AI SOLUTIONS" />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-semibold text-gray-700">Accent Color</label>
                                          <div className="flex gap-2 mt-2">
                                             {['#22D3EE', '#A855F7', '#38BDF8', '#F59E0B', '#22C55E', '#818CF8'].map(color => (
                                                 <button 
                                                    key={color}
                                                    type="button"
                                                    onClick={() => setProductFormData({...productFormData, accent: color})}
                                                    className={`w-6 h-6 rounded-full border-2 ${productFormData.accent === color ? 'border-black scale-110' : 'border-transparent'}`}
                                                    style={{ backgroundColor: color }}
                                                 />
                                             ))}
                                          </div>
                                     </div>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Explore Link</label>
                                     <input type="text" name="linkUrl" value={productFormData.linkUrl} onChange={handleProductChange} className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="#" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Image URL</label>
                                     <div className="flex gap-2 mt-1">
                                        <input type="text" name="imageUrl" value={productFormData.imageUrl} onChange={handleProductChange} className="w-full rounded-xl border p-2 border-gray-300" placeholder="https://..." />
                                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium flex items-center">
                                            <span>Upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                if(e.target.files && e.target.files[0]) {
                                                    const url = await handleImageUpload(e.target.files[0]);
                                                    if(url) setProductFormData(prev => ({...prev, imageUrl: url}));
                                                }
                                            }} />
                                        </label>
                                     </div>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Description</label>
                                     <textarea name="description" value={productFormData.description} onChange={handleProductChange} rows={3} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="Product description..." />
                                 </div>
                                 
                                 <div className="flex justify-end pt-2">
                                     {editingProductId && <button type="button" onClick={resetProductForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingProductId ? 'Update Product' : 'Add Product'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Products</h2>
                              <div className="space-y-4">
                                 {products.length === 0 ? (
                                     <p className="text-gray-500">No products found.</p>
                                 ) : (
                                     products.map(prod => (
                                         <div key={prod._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                                             <div className="flex gap-4">
                                                 {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />}
                                                 <div>
                                                     <div className="flex items-center gap-2 mb-1">
                                                         <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase font-bold">{prod.tag}</span>
                                                     </div>
                                                     <h3 className="font-semibold text-[#2C3E50]">{prod.title}</h3>
                                                     <p className="text-sm text-gray-500 mt-1">{prod.description}</p>
                                                     <div className="mt-2 text-xs text-[#00A99D] font-medium">Link: {prod.linkUrl}</div>
                                                 </div>
                                             </div>
                                             <div className="flex gap-2">
                                                 <button onClick={() => handleStartEditProduct(prod)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Edit</button>
                                                 <button onClick={() => handleDeleteProduct(prod._id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}

                {activeTab === 'events' && (
                     <div className="space-y-8">
                         {/* Create/Edit Event Form */}
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingEventId ? 'Edit Event' : 'Add New "Tech Innovation" Event'}</h2>
                             <form onSubmit={handleEventSubmit} className="space-y-4">
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Event Title</label>
                                     <input type="text" name="title" value={eventFormData.title} onChange={handleEventChange} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" placeholder="e.g. AI Architecture Masterclass" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Tag (e.g. HACKATHON)</label>
                                        <input type="text" name="tag" value={eventFormData.tag} onChange={handleEventChange} placeholder="TECH WORKSHOP" required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Date & Location</label>
                                        <input type="text" name="date" value={eventFormData.date} onChange={handleEventChange} placeholder="Sep 24, 2024 · Virtual" required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                    </div>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Description</label>
                                     <textarea name="description" value={eventFormData.description} onChange={handleEventChange} rows={3} required className="w-full mt-1 rounded-xl border p-2 border-gray-300" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-semibold text-gray-700">Accent Color</label>
                                     <div className="flex gap-4 mt-2">
                                         {['#8B5CF6', '#22D3EE', '#34D399', '#F472B6', '#F59E0B'].map(color => (
                                             <button 
                                                key={color}
                                                type="button"
                                                onClick={() => setEventFormData({...eventFormData, accent: color})}
                                                className={`w-8 h-8 rounded-full border-2 ${eventFormData.accent === color ? 'border-black scale-110' : 'border-transparent'}`}
                                                style={{ backgroundColor: color }}
                                             />
                                         ))}
                                     </div>
                                 </div>
                                 
                                 <div className="flex justify-end pt-2">
                                     {editingEventId && <button type="button" onClick={resetEventForm} className="mr-3 text-gray-500">Cancel</button>}
                                     <button type="submit" className="rounded-xl bg-[#00A99D] px-6 py-2 text-white font-semibold">
                                         {editingEventId ? 'Update Event' : 'Add Event'}
                                     </button>
                                 </div>
                             </form>
                         </div>

                         {/* List Existing Events */}
                         <div className="bg-white rounded-2xl shadow-xl p-8">
                             <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Existing Events</h2>
                              <div className="space-y-4">
                                 {events.length === 0 ? (
                                     <p className="text-gray-500">No events found.</p>
                                 ) : (
                                     events.map(evt => (
                                         <div key={evt._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                                             <div>
                                                 <div className="flex items-center gap-2 mb-1">
                                                     <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100" style={{color: evt.accent}}>{evt.tag}</span>
                                                     <span className="text-xs text-gray-400">{evt.date}</span>
                                                 </div>
                                                 <h3 className="font-semibold text-[#2C3E50]">{evt.title}</h3>
                                             </div>
                                             <div className="flex gap-2">
                                                 <button onClick={() => handleStartEditEvent(evt)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Edit</button>
                                                 <button onClick={() => handleDeleteEvent(evt._id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                )}
                {activeTab === 'create' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                         <h2 className="text-xl font-bold text-[#2C3E50] mb-6">{editingId ? 'Edit Post' : 'Write New Article'}</h2>
                         <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Title</label>
                                <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                                required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Summary</label>
                                <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                                required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label className="block text-sm font-semibold text-gray-700">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                                    required
                                />
                                </div>
                                <div>
                                <label className="block text-sm font-semibold text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                                    required
                                />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Content (Separate paragraphs with double enter)</label>
                                <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={12}
                                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-[#00A99D] focus:ring-[#00A99D]"
                                required
                                />
                            </div>

                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
                                />
                                <span className="text-sm font-medium text-gray-700">Featured Article</span>
                                </label>
                                <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isSpotlight"
                                    checked={formData.isSpotlight}
                                    onChange={handleChange}
                                    className="h-5 w-5 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
                                />
                                <span className="text-sm font-medium text-gray-700">Spotlight Article</span>
                                </label>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                type="submit"
                                className="rounded-xl bg-[#00A99D] px-8 py-3 text-sm font-semibold text-white hover:bg-[#008f85] shadow-lg shadow-[#00A99D]/25 transition"
                                >
                                {editingId ? 'Update Post' : 'Publish Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'manage' && (
                     <div className="bg-white rounded-2xl shadow-xl p-8">
                         <h2 className="text-xl font-bold text-[#2C3E50] mb-6">Manage Existing Posts</h2>
                         <div className="space-y-4">
                             {blogPosts.length === 0 ? (
                                 <p className="text-gray-500">No posts found.</p>
                             ) : (
                                 blogPosts.map(post => (
                                     <div key={post._id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                         <div>
                                             <h3 className="font-semibold text-[#2C3E50]">{post.title}</h3>
                                             <p className="text-xs text-gray-500">{post.date ? new Date(post.date).toLocaleDateString() : 'No date'} - {post.author}</p>
                                         </div>
                                         <div className="flex gap-2">
                                             <button onClick={() => handleStartEdit(post)} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Edit</button>
                                             <button onClick={() => handleDelete(post._id)} className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                                         </div>
                                     </div>
                                 ))
                             )}
                         </div>
                     </div>
                )}

                {activeTab === 'subscribers' && (
                     <div className="bg-white rounded-2xl shadow-xl p-8">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#2C3E50]">Newsletter Subscribers</h2>
                            <button onClick={fetchSubscribers} className="text-sm text-[#00A99D] hover:underline">Refresh List</button>
                         </div>
                         <div className="overflow-x-auto">
                             <table className="w-full text-left border-collapse">
                                 <thead>
                                     <tr className="border-b border-gray-200">
                                         <th className="py-2 px-4 font-semibold text-gray-700">Email</th>
                                         <th className="py-2 px-4 font-semibold text-gray-700">Date Subscribed</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {subscribers.length === 0 ? (
                                         <tr>
                                             <td colSpan="2" className="py-4 px-4 text-center text-gray-500">No subscribers yet.</td>
                                         </tr>
                                     ) : (
                                         subscribers.map(sub => (
                                             <tr key={sub._id} className="border-b border-gray-100 hover:bg-gray-50">
                                                 <td className="py-3 px-4 text-[#2C3E50]">{sub.email}</td>
                                                 <td className="py-3 px-4 text-gray-500 text-sm">
                                                     {new Date(sub.subscribedAt).toLocaleString()}
                                                 </td>
                                             </tr>
                                         ))
                                     )}
                                 </tbody>
                             </table>
                         </div>
                         <div className="mt-4 text-xs text-gray-400 text-right">
                             Total: {subscribers.length} subscribers
                         </div>
                     </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
