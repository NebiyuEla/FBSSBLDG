// /api/sync.js

let globalState = {
  progress: 65,
  daysLeft: 45,
  funds: "ETB 12.4M",
  videoUrl: "https://www.tiktok.com/@logawwwww/video/7595218252356128020",
  videoDesc: "Weekly construction progress update",
  comments: [],
  timestamp: Date.now()
};

export default async function handler(req, res) {
  // Enable CORS for global access
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // GET request - return current state
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: globalState,
      timestamp: globalState.timestamp
    });
  }
  
  // POST request - update state
  if (req.method === 'POST') {
    try {
      const { action, data, timestamp } = req.body;
      
      if (action === 'save') {
        // Update global state
        globalState = {
          ...globalState,
          ...data,
          timestamp: timestamp
        };
        
        console.log('State updated:', globalState);
        
        return res.status(200).json({
          success: true,
          message: 'State updated successfully',
          timestamp: globalState.timestamp
        });
      }
      
      return res.status(400).json({ error: 'Invalid action' });
      
    } catch (error) {
      console.error('Error updating state:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}