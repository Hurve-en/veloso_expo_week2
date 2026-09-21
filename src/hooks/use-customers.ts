import { useEffect, useState } from "react";
import { fetchCustomers, Customers } from "@/data/customer";
import { problemFor, Status } from "@/data/problem";

export function useCustomers() {
  const [status, setStatus] = useState<Status>("loading");
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [problem, setProblem] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus("loading");

    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        setStatus(data.length === 0 ? "empty" : "content");
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setProblem(problemFor(err));
        setStatus("error");
      });
  }, [attempt]);

  return {
    status,
    customers,
    problem,
    retry: () => setAttempt(attempt + 1),
  };
}

/* to show loading


  useEffect(() => {
  setStatus("loading");

  setTimeout(() => {
    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        setStatus(data.length === 0 ? "empty" : "content");
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setProblem(problemFor(err));
        setStatus("error");
      });
  }, 3000);
}, [attempt]);

*/
