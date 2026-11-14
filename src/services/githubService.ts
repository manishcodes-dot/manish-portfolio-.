import { ContributionDay } from '../components/ui/contribution-skyline';
import { MANISH_GITHUB_CONTRIBUTIONS } from '../data/githubContributions';

const GITHUB_USERNAME = 'manishcodes-dot';

interface RawEvent {
  type: string;
  created_at: string;
  payload?: {
    size?: number;
    distinct_size?: number;
    commits?: unknown[];
  };
}

/**
 * Fetches real-time GitHub contributions for the specified user.
 * Combines high-resolution calendar scrapers with official GitHub events API
 * to ensure commits pushed seconds ago appear immediately without cache delay.
 */
export async function fetchLiveContributions(
  username = GITHUB_USERNAME
): Promise<ContributionDay[]> {
  const timestamp = Date.now();
  let contributions: ContributionDay[] = [];

  // Step 1: Attempt to fetch from primary dynamic calendar provider
  try {
    const res = await fetch(`https://gh-calendar.rschristian.dev/user/${username}?_t=${timestamp}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.contributions)) {
        // data.contributions can be a 2D array of weeks or flat array
        const flat = data.contributions.flat();
        contributions = flat.map((c: { date: string; count: number }) => ({
          date: c.date,
          count: Number(c.count) || 0,
        }));
      }
    }
  } catch (err) {
    console.warn('Primary contributions provider error, trying fallback:', err);
  }

  // Step 2: Fallback to jogruber API if primary failed or returned empty
  if (!contributions.length) {
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last&_t=${timestamp}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.contributions)) {
          contributions = data.contributions.map((c: { date: string; count: number }) => ({
            date: c.date,
            count: Number(c.count) || 0,
          }));
        }
      }
    } catch (err) {
      console.warn('Fallback contributions provider error:', err);
    }
  }

  // If still empty, seed with bundled snapshot
  if (!contributions.length) {
    contributions = [...MANISH_GITHUB_CONTRIBUTIONS];
  }

  // Step 3: Fetch official real-time GitHub events to capture today/recent commits immediately
  try {
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100&_t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (eventsRes.ok) {
      const events: RawEvent[] = await eventsRes.json();
      if (Array.isArray(events)) {
        const eventCountsByDate: Record<string, number> = {};

        for (const ev of events) {
          if (!ev.created_at) continue;
          const date = ev.created_at.slice(0, 10);
          let count = 0;

          if (ev.type === 'PushEvent') {
            count = ev.payload?.distinct_size ?? ev.payload?.size ?? ev.payload?.commits?.length ?? 1;
          } else if (['CreateEvent', 'PullRequestEvent', 'IssuesEvent', 'CommitCommentEvent'].includes(ev.type)) {
            count = 1;
          }

          if (count > 0) {
            eventCountsByDate[date] = (eventCountsByDate[date] || 0) + count;
          }
        }

        // Merge live event counts into contribution map
        const map = new Map<string, number>(contributions.map((c) => [c.date, c.count]));

        for (const [date, count] of Object.entries(eventCountsByDate)) {
          const existing = map.get(date) ?? 0;
          map.set(date, Math.max(existing, count));
        }

        // Ensure today's date exists in the calendar
        const todayKey = new Date().toISOString().slice(0, 10);
        if (!map.has(todayKey)) {
          map.set(todayKey, eventCountsByDate[todayKey] || 0);
        }

        contributions = Array.from(map.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));
      }
    }
  } catch (err) {
    console.warn('GitHub events real-time sync note:', err);
  }

  return contributions;
}

