//Api fetching code

export type Customers = {
  id: string;
  name: string;
  balance: number;
  lastPaid: string;
};

const BASE = process.env.EXPO_PUBLIC_API_URL;

if (!BASE) {
  throw new Error("Set EXPO_PUBLIC_API_URL in .env");
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), ms);
  });
}

async function get(path: string) {
  const res = await Promise.race([fetch(BASE + path), timeout(8000)]);

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  const data = await res.json();

  console.log("API DATA:", data);

  return data;
}

export const fetchCustomers = (): Promise<Customers[]> => get("/api/customers");

export const fetchCustomer = (id: string): Promise<Customers> =>
  get(`/api/customers/${id}`);

export async function addCustomer(
  name: string,
  balance: number,
): Promise<Customers> {
  const res = await Promise.race([
    fetch(BASE + "/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        balance,
      }),
    }),
    timeout(8000),
  ]);

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  return res.json();
}
