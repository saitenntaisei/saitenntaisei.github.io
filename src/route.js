export function getRouteFromHash(hash = window.location.hash) {
  const raw = (hash || "").replace(/^#/, "");

  if (raw.startsWith("L-")) {
    return { name: "home", params: {}, anchor: raw };
  }

  const projectMatch = raw.match(/^\/projects\/([a-z0-9-]+)$/);
  if (projectMatch) {
    return { name: "project", params: { slug: projectMatch[1] }, anchor: null };
  }

  if (raw === "/projects") {
    return { name: "home", params: {}, anchor: "L-projects" };
  }

  return { name: "home", params: {}, anchor: null };
}
