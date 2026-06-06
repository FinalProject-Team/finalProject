// ═══════════════════════════════════════════════════════
//  Community Service — sidebar data (trending, events…)
//  TODO: Replace with real axios calls
// ═══════════════════════════════════════════════════════


// TODO: GET /api/community/leaderboard
export async function fetchLeaderboard() {
  await DELAY(400);
  return LEADERBOARD;
}


