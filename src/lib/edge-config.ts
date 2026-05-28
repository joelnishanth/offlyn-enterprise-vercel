import { get } from "@vercel/edge-config";

export type FeatureFlags = {
  useLiveAI: boolean;
  enableWaitlist: boolean;
  heroVariant: "default" | "enterprise";
};

const DEFAULT_FLAGS: FeatureFlags = {
  useLiveAI: false,
  enableWaitlist: true,
  heroVariant: "default",
};

export async function getFeatureFlags(): Promise<FeatureFlags> {
  if (!process.env.EDGE_CONFIG) {
    return DEFAULT_FLAGS;
  }

  try {
    const [useLiveAI, enableWaitlist, heroVariant] = await Promise.all([
      get<boolean>("useLiveAI"),
      get<boolean>("enableWaitlist"),
      get<FeatureFlags["heroVariant"]>("heroVariant"),
    ]);

    return {
      useLiveAI: useLiveAI ?? DEFAULT_FLAGS.useLiveAI,
      enableWaitlist: enableWaitlist ?? DEFAULT_FLAGS.enableWaitlist,
      heroVariant: heroVariant ?? DEFAULT_FLAGS.heroVariant,
    };
  } catch {
    return DEFAULT_FLAGS;
  }
}
