export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name } = req.body;
    
    const updatedCategory = { id, name }; 
    return res.status(200).json(updatedCategory);
  }

  if (req.method === 'DELETE') {
  
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
