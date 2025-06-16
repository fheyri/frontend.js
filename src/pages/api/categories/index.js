let categories = []; 
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(categories);
  } else if (req.method === 'POST') {
    const newCategory = { id: Date.now(), name: req.body.name };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } else {
    res.status(405).end(); 
  }
}
