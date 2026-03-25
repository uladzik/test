"use client";

import { useEffect, useState } from "react";

interface DraftItem {
  id: string;
  model: string;
  modelFamily: string;
  title: string;
  price: number;
  priceStr: string;
  offerPrice: number;
  link: string;
  imageUrl?: string;
  draftMessage: string;
  scrapedAt: string;
}

const FAMILY_COLORS: Record<string, string> = {
  "x-metal": "bg-yellow-900/40 text-yellow-300 border-yellow-700",
  "jackets": "bg-blue-900/40 text-blue-300 border-blue-700",
  "m-frame": "bg-green-900/40 text-green-300 border-green-700",
  "frogskins": "bg-purple-900/40 text-purple-300 border-purple-700",
  "wire": "bg-cyan-900/40 text-cyan-300 border-cyan-700",
  "iconic": "bg-red-900/40 text-red-300 border-red-700",
  "lifestyle": "bg-gray-700/40 text-gray-300 border-gray-600",
};

export default function Home() {
  const [items, setItems] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapeMsg, setScrapeMsg] = useState("");
  const [editingMsg, setEditingMsg] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const fetchResults = async () => {
    setLoading(true);
    const res = await fetch("/api/results");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleScrape = async () => {
    setScraping(true);
    setScrapeMsg("Scanning Vinted...");
    try {
      const res = await fetch("/api/scrape", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setScrapeMsg(`Done — ${data.new} new items found`);
        await fetchResults();
      } else {
        setScrapeMsg(`Error: ${data.error}`);
      }
    } catch {
      setScrapeMsg("Network error");
    }
    setScraping(false);
  };

  const getMessage = (item: DraftItem) =>
    editingMsg[item.id] !== undefined ? editingMsg[item.id] : item.draftMessage;

  const handleSend = async (item: DraftItem) => {
    setSending(item.id);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          itemLink: item.link,
          message: getMessage(item),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        showToast("Message sent!");
      } else if (data.error === "NOT_LOGGED_IN") {
        showToast("Not logged in to Vinted — please log in first");
      } else {
        showToast(`Error: ${data.error}`);
      }
    } catch {
      showToast("Failed to send");
    }
    setSending(null);
  };

  const handleDismiss = async (item: DraftItem) => {
    await fetch("/api/dismiss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Oakley Hunter</h1>
          <p className="text-gray-500 text-sm">Vintage 90s–2000s · Vinted.de</p>
        </div>
        <div className="flex items-center gap-3">
          {scrapeMsg && (
            <span className="text-sm text-gray-400">{scrapeMsg}</span>
          )}
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-sm font-medium transition-colors"
          >
            {scraping ? "Scanning..." : "Scan Vinted"}
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="px-6 py-3 border-b border-gray-800/60 flex items-center gap-4 text-sm text-gray-500">
        <span>{items.length} draft{items.length !== 1 ? "s" : ""} pending</span>
        {items.length > 0 && (
          <>
            <span className="text-gray-600">·</span>
            <span>avg offer: {Math.round(items.reduce((s, i) => s + i.offerPrice, 0) / items.length)}€</span>
          </>
        )}
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {loading && (
          <div className="text-center text-gray-600 py-20">Loading...</div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-2">No drafts</p>
            <p className="text-gray-700 text-sm">Hit &quot;Scan Vinted&quot; to find listings</p>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              {/* Item header */}
              <div className="flex items-start gap-3 p-4">
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-800"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded border font-medium ${
                        FAMILY_COLORS[item.modelFamily] || FAMILY_COLORS["lifestyle"]
                      }`}
                    >
                      {item.model}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white font-semibold">{item.priceStr}</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-orange-400 font-semibold">offer {item.offerPrice}€</span>
                    <span className="text-gray-600 text-xs">(-42%)</span>
                  </div>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-400 text-xs underline flex-shrink-0"
                >
                  View
                </a>
              </div>

              {/* Draft message */}
              <div className="px-4 pb-3">
                <textarea
                  rows={2}
                  value={getMessage(item)}
                  onChange={(e) =>
                    setEditingMsg((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 resize-none focus:outline-none focus:border-gray-500"
                />
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => handleSend(item)}
                  disabled={sending === item.id}
                  className="flex-1 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-sm font-medium transition-colors"
                >
                  {sending === item.id ? "Sending..." : "Send Message"}
                </button>
                <button
                  onClick={() => handleDismiss(item)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-400 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
