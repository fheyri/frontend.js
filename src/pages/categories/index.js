import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addCategory = async () => {
    if (!newName.trim()) return;
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    const data = await res.json();
    setCategories([...categories, data]);
    setNewName('');
  };

  const deleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) return;
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    });
    const updated = await res.json();
    setCategories(categories.map(c => c.id === id ? updated : c));
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className={`${darkMode ? 'bg-blue-950 text-white' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'} min-h-screen flex flex-col transition-all duration-500`}>

      {/* Navbar */}
      <nav className={`backdrop-blur ${darkMode ? 'bg-blue-900' : 'bg-white/40'} shadow-md px-6 py-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-white">BlueLibrary</Link>
          <div className="space-x-6 flex items-center">
            <Link href="/books/navbar" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-blue-900'}`}>Home</Link>
            <Link href="/books/add" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-blue-900'}`}>Tambah Buku</Link>
            <Link href="/categories" className={`hover:underline transition ${darkMode ? 'text-white' : 'text-blue-900'}`}>Kategori</Link>
            <button
              onClick={toggleDarkMode}
              className="ml-2 text-xl px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? '☀' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className={`flex-grow w-full max-w-3xl mx-auto ${darkMode ? 'bg-blue-900' : 'bg-white/80'} backdrop-blur-md mt-10 rounded-3xl shadow-2xl px-6 py-12`}>
        <h1 className={`text-4xl font-extrabold mb-4 text-center ${darkMode ? 'text-white' : 'text-blue-900'}`}>
          📘 Kategori Buku
        </h1>
        <p className={`text-center mb-6 text-lg italic ${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
          Tambahkan kategori seperti Fiksi / Non Fiksi
        </p>

        {/* Input Tambah */}
        <div className="flex gap-4 mb-8">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nama kategori baru"
            className="flex-1 px-4 py-2 rounded-xl shadow-md border border-blue-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transition"
          >
            Tambah
          </button>
        </div>

        {/* Daftar Kategori */}
        <ul className="space-y-6">
          {categories.map(c => (
            <li
              key={c.id}
              className={`p-4 rounded-2xl shadow-md flex justify-between items-center transform transition duration-300 hover:scale-[1.02] ${darkMode ? 'bg-blue-800 text-white border border-blue-600' : 'bg-white text-blue-900 border border-blue-200'}`}
            >
              {editingId === c.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 mr-4 px-3 py-2 rounded-xl border text-black"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="bg-gradient-to-r from-blue-300 to-blue-500 text-black px-4 py-2 rounded-lg hover:from-blue-400 hover:to-blue-600"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex-1">{c.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(c.id, c.name)}
                      className="bg-gradient-to-r from-blue-300 to-blue-500 text-black px-4 py-2 rounded-lg hover:from-blue-400 hover:to-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-800"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-blue-900 text-white' : 'bg-white/40'} backdrop-blur shadow-inner mt-12 py-5 rounded-t-2xl`}>
        <div className="text-center text-sm">
          © {new Date().getFullYear()} BlueLibrary. All rights reserved by fachry XI Sija 2.
        </div>
      </footer>
    </div>
  );
}
