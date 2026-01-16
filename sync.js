import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Return latest data
        const data = await getLatestData();
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        // Update data
        await updateData(req.body);
        res.status(200).json({ success: true });
    }
}
