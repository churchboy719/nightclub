export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === "PUT") {
      const { status } = req.body;
      await toggleCashierStatus(id, status); // Replace with actual DB query
      return res.status(200).json({ message: "Cashier status updated" });
    }
  
    res.status(405).json({ message: "Method not allowed" });
  }
  