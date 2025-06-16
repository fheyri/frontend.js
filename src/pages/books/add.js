import { useRouter } from "next/router";
import { useState } from "react";
import { createBook } from "../../../lib/api/books";
import Link from "next/link";

export default function AddBookPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError =(null); 
    setLoading = (true);

    try {
      await createBook( title, author );
      router.push("/books");
      } catch (error) {
        setError(error.message || "Something went wrong");
    } finally {
      setLoading = (false);
    }
  }

  const addBook = async (e) => {
    e.preventDefault();
    if (!title || !author) return;

    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });

    router.push("/books");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen flex flex-col text-sm transition-colors duration-500 ${
        darkMode
          ? "bg-[#1e293b] text-gray-200"
          : "bg-gradient-to-br from-[#e0f2ff] via-[#f2f9ff] to-[#dbeeff] text-gray-800"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`backdrop-blur-md sticky top-0 z-50 shadow-md ${
          darkMode ? "bg-[#334155]" : "bg-white/30"
        } px-6 py-4`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            📚 BlueLibrary
          </Link>
          <div className="space-x-4 text-sm flex items-center">
            <Link href="/books/navbar" className="hover:underline">
              Home
            </Link>
            <Link href="/books/add" className="hover:underline">
              Tambah Buku
            </Link>
            <Link href="/categories" className="hover:underline">
              Kategori
            </Link>
            <button
              onClick={toggleDarkMode}
              className="ml-2 px-3 py-1 rounded-full bg-white/30 hover:bg-white/50 transition text-lg"
              title="Toggle Dark Mode"
            >
              {darkMode ? "☀" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main
        className={`flex-grow w-full max-w-xl mx-auto mt-10 mb-16 p-6 rounded-2xl shadow-xl transition-all duration-500 ${
          darkMode
            ? "bg-[#334155] text-white"
            : "bg-white/50 backdrop-blur-md text-gray-800"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center border border-blue-300 rounded-xl p-3 shadow-sm">
          ➕ Tambah Buku Baru
        </h1>

        <form onSubmit={addBook} className="space-y-6">
          {/* Judul */}
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Judul Buku
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul buku"
              className={`w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300"
              }`}
            />
          </div>

          {/* Penulis */}
          <div>
            <label htmlFor="author" className="block mb-2 font-medium">
              Penulis
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Masukkan nama penulis"
              className={`w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300"
              }`}
            />
          </div>

          {/* Tombol */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg text-sm shadow-md transition"
            >
              Simpan Buku
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer
        className={`text-center py-4 text-xs ${
          darkMode ? "bg-[#334155] text-gray-300" : "bg-white/40 text-gray-700"
        }`}
      >
        © {new Date().getFullYear()} fachry XI Sija 2. All rights reserved.
      </footer>
    </div>
  );
}