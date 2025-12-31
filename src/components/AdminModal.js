import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";

export default function AdminModal({ isOpen, onClose }) {
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
            sessionStorage.setItem("adminAuth", "true"); // Keep for legacy check if needed, or remove
            window.location.href = "/admin-dashboard"; 
        } else {
            setError(data.msg || "Incorrect password");
        }
    } catch (err) {
        setError("Login failed. Check server.");
        console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          content: formData.content.split("\n\n"), // Split by double newline for paragraphs
        }),
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        onClose();
        window.location.reload(); // Refresh to show new post
      } else {
        alert("Failed to create blog post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-[#2C3E50] mb-4 text-center">Admin Access</h2>
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
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#00A99D] px-6 py-2 text-sm font-semibold text-white hover:bg-[#008f85] shadow-lg shadow-[#00A99D]/25"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Create New Blog Post</h2>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-[#00A99D]">
            Logout
          </button>
        </div>
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
              rows={10}
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

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#00A99D] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#008f85] shadow-lg shadow-[#00A99D]/25"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
