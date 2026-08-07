import { env } from "../schemas/env";

export async function getPlaceName(placeId: string): Promise<string | null> {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'displayName',
      },
    }
  );

  if (!response.ok) return null;

  const data: any = await response.json();
  return data.displayName?.text ?? null;
}