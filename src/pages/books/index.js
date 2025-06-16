import { useEffect, useState } from "react";
import Link from 'next/link';
import { getBooks, deleteBook as apiDeleteBook } from '../../../lib/api/books';

export default function Booklist() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getBooks();
            setBooks(data.data);
            setFilteredBooks(data.data);
            setIsLoading(false);
        }
        
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = books.filter(book => {
            const matchesTitle = book.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAuthor = book.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTitle || matchesAuthor;
        });
        setFilteredBooks(filtered);
    }, [searchQuery, books]);

    const deleteBook = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
            await fetch(`/api/books/${id}`, {
                method: 'DELETE'
            });
            setBooks(books.filter(b => b.id !== id));
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} min-h-screen flex flex-col transition-colors duration-500`}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
                
                :root {
                    --color-primary: 59 130 246;
                    --color-secondary: 139 92 246;
                }
                
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    @apply antialiased;
                }
                
                .font-display {
                    font-family: 'Playfair Display', serif;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .book-card {
                    transition: all 0.3s ease;
                    background: linear-gradient(145deg, ${darkMode ? '#1e293b' : '#ffffff'}, ${darkMode ? '#0f172a' : '#f8fafc'});
                    box-shadow: ${darkMode ? 
                        '5px 5px 15px #0f172a, -5px -5px 15px #1e293b' : 
                        '5px 5px 15px #e2e8f0, -5px -5px 15px #ffffff'};
                }
                
                .book-card:hover {
                    transform: translateY(-4px);
                    box-shadow: ${darkMode ? 
                        '8px 8px 20px #0f172a, -8px -8px 20px #1e293b' : 
                        '8px 8px 20px #e2e8f0, -8px -8px 20px #ffffff'};
                }
            `}</style>

            {/* Premium Navbar */}
            <nav className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-gray-900/90 border-b border-gray-800' : 'bg-white/90 border-b border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} flex items-center justify-center`}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} font-display`}>BlueLibrary</span>
                        </Link>
                        
                        <div className="flex items-center space-x-6">
                            <div className="hidden md:flex space-x-6">
                                <Link href="/books/navbar" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Home
                                </Link>
                                <Link href="/books/add" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Tambah Buku
                                </Link>
                                <Link href="/categories" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Kategori
                                </Link>
                            </div>
                            
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-amber-300 hover:bg-gray-700' : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'} transition-colors`}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Elegant Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 font-display`}>Daftar Buku</h1>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {filteredBooks.length} buku tersedia di koleksi Anda
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari buku..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            
                            <Link
                                href="/books/add"
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Tambah Buku</span>
                            </Link>
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={`book-card rounded-xl p-5 h-40 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                                    <div className="animate-pulse flex flex-col h-full justify-between">
                                        <div>
                                            <div className={`h-5 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-3/4 mb-3`}></div>
                                            <div className={`h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-1/2`}></div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className={`h-8 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-16`}></div>
                                            <div className={`h-8 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-16`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className={`text-center py-16 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-sm`}>
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                                    <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Tidak ada hasil</h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
                                    {searchQuery ? `Tidak ditemukan buku dengan kata kunci "${searchQuery}"` : 'Anda belum menambahkan buku apapun'}
                                </p>
                                <Link
                                    href="/books/add"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Tambah Buku Baru
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBooks.map((book) => (
                                <div key={book.id} className="book-card rounded-xl p-5 transition-all duration-300">
                                    <div className="flex flex-col h-full">
                                        <div className="flex-grow">
                                            <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}>
                                                {book.title}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>Oleh {book.author}</p>
                                            
                                            {book.category && (
                                                <span className={`inline-block px-2 py-1 text-xs rounded-full mb-4 ${darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>
                                                    {book.category}     
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <Link
                                                href={`/books/${book.id}`}
                                                className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteBook(book.id)}
                                                className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-colors ${darkMode ? 'bg-red-900/50 hover:bg-red-800 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Sophisticated Footer */}
            <footer className={`py-6 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} flex items-center justify-center`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>BlueLibrary</span>
                        </div>
                        
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center md:text-right`}>
                            © {new Date().getFullYear()} fachry XI Sija 2. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}