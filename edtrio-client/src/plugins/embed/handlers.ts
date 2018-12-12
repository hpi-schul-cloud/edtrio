export default function handleUrl(url: string) {
  const handlers = [
    {
      provider: "youtube",
      regex: /youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)/i,
      mapUrl: (regexMatch: string[]) => {
        return `https://www.youtube-nocookie.com/embed/${regexMatch[1]}`;
      },
    },
    {
      provider: "vimeo",
      // eslint-disable-next-line
      regex: /vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/i,
      mapUrl: (regexMatch: string[]) => {
        return `https://player.vimeo.com/video/${regexMatch[2]}`;
      },
    },
    {
      provider: "default",
      regex: /.*/i,
    },
  ];

  for (const handler of handlers) {
    const regexMatch = handler.regex.exec(url);

    if (regexMatch) {
      const mappedUrl = handler.mapUrl ? handler.mapUrl(regexMatch) : url;

      return {
        provider: handler.provider,
        url: mappedUrl,
      };
    }
  }
  return null;
}
