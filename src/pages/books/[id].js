import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(data => setBook(data));
    }
  }, [id]);

  const updateBook = async (data) => {
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    router.push('/books');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!book) return <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    <p className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Loading...</p>
  </div>;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} min-h-screen flex flex-col transition-colors duration-200`}>
      
      {/* Compact Navbar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 py-3 sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className={`text-xl font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>MyLibrary</Link>
          <div className="flex items-center space-x-4">
            <Link href="/books" className={`text-sm ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'} transition`}>
              Home
            </Link>
            <Link href="/books/add" className={`text-sm ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'} transition`}>
              Add Book
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              title="Toggle Dark Mode"
            >
              {darkMode ? '☀' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Compact Main Content */}
      <main className="flex-grow w-full max-w-2xl mx-auto px-4 py-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
          <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'} flex items-center`}>
            <span className="mr-2">✏️</span> Edit Book
          </h1>

          {/* Compact Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={book.title}
                className={`mt-1 w-full px-3 py-2 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div>
              <label htmlFor="author" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Author</label>
              <input
                type="text"
                id="author"
                name="author"
                defaultValue={book.author}
                className={`mt-1 w-full px-3 py-2 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => router.push('/books')}
                className={`px-4 py-2 text-sm rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = document.getElementById('title').value;
                  const author = document.getElementById('author').value;
                  updateBook({ title, author });
                }}
                className={`px-4 py-2 text-sm rounded text-white ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-4 mt-8`}>
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} MyLibrary. All rights reserved.
        </div>
      </footer>
    </div>
  );
}