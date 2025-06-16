javascript
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
        <p className="text-center">Selamat datang di Dashboard!</p>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}