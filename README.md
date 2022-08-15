# link-preview-server

링크 미리보기에 필요한 정보를 scraping해서 응답하는 서버

- title, meta-description, open-graph tags

## response

```JSON
{
  "title": "site title", // og:title ?? title ?? null
  "description": "site description", // og:description ?? description ?? null
  "imageUrl": "site image url", // og:image ?? null
  "domainName": "site url" // og:url ?? null
}
```

## get started

```bash
# 1. add .env file in the root folder
PORT=<YOUR_PORT_NUMBER>

# 2. install node_modules
npm install

# 3. start dev server
npm run start
```
