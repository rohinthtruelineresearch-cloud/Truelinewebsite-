const EVENT_IMAGE_PATTERN = /\.(png|jpe?g|webp|svg)$/i;

const toReadableLabel = (key) => {
  const trimmed = key.replace("./", "").replace(EVENT_IMAGE_PATTERN, "").replace(/[-_]/g, " ").trim();
  if (!trimmed) return "Event highlight";
  return trimmed.replace(/\b\w/g, (char) => char.toUpperCase());
};

const loadGallery = () => {
  const deduped = new Map();

  try {
    const context = require.context("./", false, EVENT_IMAGE_PATTERN);
    context.keys().forEach((key) => {
      const label = toReadableLabel(key);
      const resolved = context(key);
      const src = typeof resolved === "string" ? resolved : resolved?.default;
      if (!deduped.has(src)) {
        deduped.set(src, {
          src,
          alt: `${label} event photo`,
          label,
        });
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("Unable to load event images from src/event-gallery", error);
    }
  }

  try {
    const fallback = require.context("../images/events", false, EVENT_IMAGE_PATTERN);
    fallback.keys().forEach((key) => {
      const label = toReadableLabel(key);
      const resolved = fallback(key);
      const src = typeof resolved === "string" ? resolved : resolved?.default;
      if (!deduped.has(src)) {
        deduped.set(src, {
          src,
          alt: `${label} event photo`,
          label,
        });
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("Unable to load event images from src/images/events", error);
    }
  }

  return Array.from(deduped.values());
};

export { EVENT_IMAGE_PATTERN };
export { toReadableLabel };

const eventGallery = loadGallery();

export default eventGallery;
