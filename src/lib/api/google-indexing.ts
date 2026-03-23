import { GoogleAuth } from 'google-auth-library';

const INDEXING_API_URL =
  'https://indexing.googleapis.com/v3/urlNotifications:publish';

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 500;

function getAuth(): GoogleAuth | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.warn(
      '[google-indexing] GOOGLE_SERVICE_ACCOUNT_JSON env var is not set. Skipping indexing.',
    );
    return null;
  }

  try {
    const credentials = JSON.parse(raw);
    return new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
  } catch (err) {
    console.error(
      '[google-indexing] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:',
      err,
    );
    return null;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function notifyGoogleIndexing(
  urls: string[],
): Promise<{ success: number; failed: number }> {
  const auth = getAuth();
  if (!auth) {
    return { success: 0, failed: urls.length };
  }

  let success = 0;
  let failed = 0;

  const client = await auth.getClient();

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(async (url) => {
        const res = await client.request({
          url: INDEXING_API_URL,
          method: 'POST',
          data: {
            url,
            type: 'URL_UPDATED',
          },
        });
        return res;
      }),
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        success++;
      } else {
        failed++;
        console.error(
          '[google-indexing] Failed to notify:',
          result.reason?.message ?? result.reason,
        );
      }
    }

    // Delay between batches (skip delay after last batch)
    if (i + BATCH_SIZE < urls.length) {
      await delay(BATCH_DELAY_MS);
    }
  }

  console.log(
    `[google-indexing] Completed: ${success} success, ${failed} failed out of ${urls.length} URLs.`,
  );

  return { success, failed };
}
