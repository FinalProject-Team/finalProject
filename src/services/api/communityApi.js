// ═══════════════════════════════════════════════════════
//  communityApi.js — caching wrapper over service layer
//  TODO: Replace mock services with real axios calls
// ═══════════════════════════════════════════════════════

import { fetchPosts }       from "../postService";
import { fetchLeaderboard } from "../communityService";
import { LEADERBOARD }      from "../../data/communityData";

const TTL = 5 * 60 * 1000; // 5 minutes

function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > TTL) { localStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function setCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

// Posts — come from PostsContext (live state), not cache
export async function getPosts() {
  return fetchPosts();
}

export async function getLeaderboard() {
  const c = getCache("ct_leaderboard");
  if (c) return c;
  const d = await fetchLeaderboard();
  setCache("ct_leaderboard", d);
  return d;
}

export function invalidateCache() {
  ["ct_leaderboard"].forEach((k) => localStorage.removeItem(k));
}
