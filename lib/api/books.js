export async function getBooks() {
    try {
        const res = await fetch('/api/books');
        if (!res.ok) {
            throw new Error(`Gagal mengambil buku. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error in getBooks:', error);
        throw error; // Re-throw the error untuk penanganan di level yang lebih tinggi
    }
}

export async function getBook(id) {
    try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
            throw new Error(`Buku tidak ditemukan. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error in getBook for id ${id}:`, error);
        throw error;
    }
}

export async function createBook(title, author) {
    try {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        });
        if (!res.ok) {
            throw new Error(`Gagal menambahkan buku. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error in createBook:', error);
        throw error;
    }
}

export async function updateBook(id, title, author) {
    try {
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        });
        if (!res.ok) {
            throw new Error(`Gagal mengupdate buku. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error in updateBook for id ${id}:`, error);
        throw error;
    }
}

export async function deleteBook(id) {
    try {
        const res = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`Gagal menghapus buku. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error in deleteBook for id ${id}:`, error);
        throw error;
    }
}