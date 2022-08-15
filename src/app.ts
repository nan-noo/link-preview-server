import express from 'express';
import cors from 'cors';
import axios from 'axios';

import type { Query } from 'express-serve-static-core';
import getPreviewData from './utils/getPreviewData';

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export type GetLinkPreviewResponseBody = { imageUrl?: string; title: string; description?: string; domainName: string };
export type GetLinkPreviewRequestParams = { linkUrl: string };

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getLinkHtml = async (linkUrl: string) => {
  const response = await axios.get(linkUrl);
  return response.data;
};

app.get('/api/link-preview', async (req: TypedRequestQuery<GetLinkPreviewRequestParams>, res) => {
  const { linkUrl } = req.query;
  if (!linkUrl || typeof linkUrl !== 'string' || linkUrl.length === 0) {
    console.error('linkUrl이 없음!');
    return res.status(400).json({ message: 'no reqest data(url)' });
  }

  try {
    const rawHtmlString = await getLinkHtml(linkUrl);
    if (!rawHtmlString) return res.status(400).json({ message: 'wrong url format' });

    const previewData = getPreviewData(rawHtmlString);
    return res.status(200).json(previewData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

export default app;
