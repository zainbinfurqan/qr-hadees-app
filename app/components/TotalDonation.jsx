"use client"

import { useEffect, useState } from "react";

export default function TotalDonation({ className = "" }) {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/donation")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const totalAmount = (data || []).reduce((sum, item) => sum + (item?.amount || 0), 0);
        setTotal(totalAmount);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to load");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className={className}>Loading total donation…</div>;
  }
  if (error) {
    return <div className={className}>Error: {error}</div>;
  }

  return (
    <div className={className}>
      <div className="rounded p-4 bg-green-900 text-white shadow-md max-w-md mx-auto text-center">
        <div className="text-sm">Total Donations</div>
        <div className="font-bold text-2xl mt-2">{(total ?? 0).toFixed(2)} RM</div>
      </div>
    </div>
  );
}
