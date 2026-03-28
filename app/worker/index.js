// Momentum Notion Proxy
// Holds NOTION_TOKEN as a secret, forwards requests to api.notion.so
// Endpoints:
//   POST /search        — search all shared pages/databases
//   GET  /databases     — list all shared databases
//   GET  /db/:id        — query a database
//   GET  /page/:id      — get a page + its children blocks
//   GET  /blocks/:id    — get block children

const NOTION = "https://api.notion.com/v1";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

async function notion(path, token, method, body) {
  const res = await fetch(NOTION + path, {
    method: method || "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return JSON.parse(text); }
  catch(e) { throw new Error("Notion non-JSON (status " + res.status + "): " + text.slice(0, 200)); }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const token = env.NOTION_TOKEN;
    if (!token) {
      return json({ error: "NOTION_TOKEN not configured" }, 500);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Search everything shared with integration
      if (path === "/search") {
        const body = request.method === "POST"
          ? await request.json().catch(() => ({}))
          : {};
        const data = await notion("/search", token, "POST", {
          query: body.query || "",
          page_size: body.page_size || 20,
          filter: body.filter || undefined,
          sort: body.sort || { direction: "descending", timestamp: "last_edited_time" },
        });
        return json(data);
      }

      // List all databases
      if (path === "/databases") {
        const data = await notion("/search", token, "POST", {
          filter: { property: "object", value: "database" },
          page_size: 50,
        });
        return json(data);
      }

      // Query a specific database
      const dbMatch = path.match(/^\/db\/([a-f0-9-]+)$/);
      if (dbMatch) {
        const body = request.method === "POST"
          ? await request.json().catch(() => ({}))
          : {};
        const data = await notion(
          "/databases/" + dbMatch[1] + "/query",
          token,
          "POST",
          { page_size: body.page_size || 50, filter: body.filter, sorts: body.sorts }
        );
        return json(data);
      }

      // Get a page
      const pageMatch = path.match(/^\/page\/([a-f0-9-]+)$/);
      if (pageMatch) {
        const [page, blocks] = await Promise.all([
          notion("/pages/" + pageMatch[1], token),
          notion("/blocks/" + pageMatch[1] + "/children?page_size=100", token),
        ]);
        return json({ page, blocks: blocks.results || [] });
      }

      // Get block children
      const blockMatch = path.match(/^\/blocks\/([a-f0-9-]+)$/);
      if (blockMatch) {
        const data = await notion("/blocks/" + blockMatch[1] + "/children?page_size=100", token);
        return json(data);
      }

      // Debug
      if (path === "/debug") {
        // Try multiple Notion hostnames
        const hosts = ["https://api.notion.so", "https://api.notion.com"];
        const results = [];
        for (const host of hosts) {
          try {
            const r = await fetch(host + "/v1/users/me", {
              headers: {
                "Authorization": "Bearer " + token,
                "Notion-Version": "2022-06-28",
              },
            });
            const t = await r.text();
            results.push({ host, status: r.status, body: t.slice(0, 200) });
          } catch(e) {
            results.push({ host, error: e.message });
          }
        }
        return json({ results });
      }

      // Health check
      if (path === "/" || path === "/health") {
        const data = await notion("/search", token, "POST", { page_size: 1 });
        return json({
          status: "ok",
          has_results: !!(data.results && data.results.length),
          object: data.object,
        });
      }

      return json({ error: "Not found", routes: ["/search", "/databases", "/db/:id", "/page/:id", "/blocks/:id"] }, 404);
    } catch (err) {
      return json({ error: err.message }, 500);
    }
  },
};
