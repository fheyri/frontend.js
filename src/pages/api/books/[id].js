import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const {id} = req.query;
    const bookId = parseInt(id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (req.method === 'GET') 
    {
        if (bookIndex === -1) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
        } 
        res.status(200).json(books[bookIndex]);
    } else if (req.method === 'PUT') {
        if (bookIndex === -1) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
        } 
        const { title, author } = req.body;
        books[bookIndex] = { 
            ...books[bookIndex], 
            title, author 
        };
        
        const filepath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\module.exports = { books };`;
        fs.writeFileSync(filepath, updatedData, 'utf8');
        
        res.status(200).json(books[bookIndex]);
    } else if (req.method === 'DELETE') {
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        } 
        books.splice(bookIndex, 1);
        
        const filepath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\module.exports = { books };`;
        fs.writeFileSync(filepath, updatedData, 'utf8');
        
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}