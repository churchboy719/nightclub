export default async function handler(req, res) {
    if (req.method === "GET") {
      const cashiers = await getAllCashiers(); // Replace with actual DB query
      return res.status(200).json(cashiers);
    }
  
    if (req.method === "POST") {
      const { username, password } = req.body;
      const hashedPassword = await hashPassword(password);
      await addCashier(username, hashedPassword); // Replace with actual DB query
      return res.status(201).json({ message: "Cashier added" });
    }
  
    res.status(405).json({ message: "Method not allowed" });
  }
  