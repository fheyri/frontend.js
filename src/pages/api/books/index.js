// Gunakan variabel lingkungan untuk URL backend
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3333';

export default async function handler(req, res) {
  const { method, query: { id }, body } = req;

  // Validasi ID untuk PUT
  if (method === 'PUT' && (!id || isNaN(id))) {
    return res.status(400).json({ message: 'ID buku tidak valid' });
  }

  switch (method) {
    case 'GET': {
      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books`);
        if (!fetchRes.ok) {
          const errorData = await fetchRes.json().catch(() => ({}));
          return res.status(fetchRes.status).json({
            message: errorData.message || 'Gagal mengambil daftar buku',
          });
        }
        const data = await fetchRes.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
      }
    }

    case 'PUT': {
      // Validasi body
      const { title, author } = body;
      if (!title || !author || typeof title !== 'string' || typeof author !== 'string') {
        return res.status(400).json({ message: 'Judul dan penulis harus diisi dengan string valid' });
      }

      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Tambahkan CSRF token atau Authorization jika diperlukan
            // 'X-CSRF-TOKEN': getCsrfToken(), // Jika Laravel membutuhkan CSRF
            // 'Authorization': `Bearer ${token}`, // Jika menggunakan Sanctum
          },
          body: JSON.stringify({ title, author }),
        });

        if (!fetchRes.ok) {
          const errorData = await fetchRes.json().catch(() => ({}));
          return res.status(fetchRes.status).json({
            message: errorData.message || 'Gagal memperbarui buku',
          });
        }

        const data = await fetchRes.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
      }
    }

    default: {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ message: `Metode ${method} tidak diizinkan` });
    }
  }
}