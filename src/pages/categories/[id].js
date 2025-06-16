import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditBookPage() {
    const router = useRouter();
    const { id } = router.query; 
    const [book, setBook] = useState({ title: "", author: "" });
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (!id) return;
        const fetchBook = async () => {
            const res = await fetch(`/api/books/${id}`);
            const data = await res.json();
            setBook(data);
            setLoading(false);
        };
        fetchBook();
    }, [id]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        if (res.ok) {
            router.push(`/books/${id}`); 
        } else {
            console.error("Failed to update the book.");
        }
    };

    
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Buku</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Judul Buku</label>
                    <input
                        type="text"
                        value={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Penulis</label>
                    <input
                        type="text"
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
}
