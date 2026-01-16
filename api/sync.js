// /api/sync.js
let globalState = {
  progress: 65,
  daysLeft: 45,
  funds: "ETB 12.4M",
  videoUrl: "https://vt.tiktok.com/ZS5EwCPyn/",
  videoDesc: "Building",
  contactPhone: "+251913489062 | +251923461261",
  lastUpdated: new Date().toISOString(),
  comments: [
    {
      id: 1,
      name: "Samuel G.",
      text: "This is amazing progress! God bless everyone involved in this project.",
      date: new Date().toISOString(),
      type: "public"
    },
    {
      id: 2,
      name: "Anonymous",
      text: "Praying for the safety of all workers. Can't wait to see the finished building!",
      date: new Date(Date.now() - 86400000).toISOString(),
      type: "anonymous"
    }
  ],
  timestamp: Date.now()
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: globalState,
      timestamp: globalState.timestamp
    });
  }
  
  if (req.method === 'POST') {
    try {
      const { action, data, commentId, timestamp } = req.body;
      
      if (action === 'save') {
        globalState = {
          ...globalState,
          ...data,
          lastUpdated: new Date().toISOString(),
          timestamp: timestamp
        };
        
        return res.status(200).json({
          success: true,
          data: globalState,
          timestamp: globalState.timestamp
        });
      }
      
      if (action === 'delete-comment') {
        globalState.comments = globalState.comments.filter(
          comment => comment.id !== commentId
        );
        globalState.timestamp = timestamp;
        globalState.lastUpdated = new Date().toISOString();
        
        return res.status(200).json({
          success: true,
          data: globalState,
          timestamp: globalState.timestamp
        });
      }
      
      if (action === 'add-comment') {
        globalState.comments.unshift({
          ...data,
          date: new Date().toISOString()
        });
        globalState.timestamp = timestamp;
        globalState.lastUpdated = new Date().toISOString();
        
        return res.status(200).json({
          success: true,
          data: globalState,
          timestamp: globalState.timestamp
        });
      }
      
      return res.status(400).json({ error: 'Invalid action' });
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
