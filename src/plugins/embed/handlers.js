export default function handleUrl(url) {
  const handlers = [
    {
      provider: 'youtube',
      regex: /youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)/i,
      mapUrl: regexMatch => {
        return `https://www.youtube-nocookie.com/embed/${regexMatch[1]}`
      }
    },
    {
      provider: 'vimeo',
      //eslint-disable-next-line
      regex: /vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/i,
      mapUrl: regexMatch => {
        return `https://player.vimeo.com/video/${regexMatch[2]}`
      }
    },
    {
      provider: 'default',
      regex: /.*/i
    }
  ]

  for (let handler of handlers) {
    const regexMatch = handler.regex.exec(url)

    if (regexMatch) {
      const mappedUrl = handler.mapUrl ? handler.mapUrl(regexMatch, url) : url

      return {
        provider: handler.provider,
        url: mappedUrl
      }
    }
  }
}
