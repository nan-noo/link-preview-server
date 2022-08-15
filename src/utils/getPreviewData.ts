type TagName = string;
type HtmlString = string;

type AttributeName = 'desc' | 'ogTitle' | 'ogUrl' | 'ogImg' | 'ogDesc';
type Attributes = {
  attr: string;
  name: AttributeName;
};

const getMatchedTags = (htmlString: HtmlString, tagName: TagName) => {
  const matchedIterator = htmlString.matchAll(new RegExp(`<${tagName}(.*?)>`, 'g'));
  const matchedArray = [...matchedIterator];

  return matchedArray.map(matched => matched[0]);
};

const getTagInnerContent = (htmlString: HtmlString, tagName: TagName) => {
  const postFixIncluded = htmlString
    .split(new RegExp(`(<${tagName}>)|(<${tagName}(\s.*?)>)`))
    .slice(1)
    .join('');

  const innerContent = postFixIncluded.split(`</${tagName}>`)[0];
  return innerContent;
};

const parseHtml = (data: HtmlString) => {
  const headHtmlString = getTagInnerContent(data, 'head');
  const title = getTagInnerContent(headHtmlString, 'title');
  const metaTags = getMatchedTags(headHtmlString, 'meta');

  return { title, metaTags };
};

const previewAttributes: Array<Attributes> = [
  { attr: 'name="description"', name: 'desc' },
  { attr: 'property="og:title"', name: 'ogTitle' },
  { attr: 'property="og:url"', name: 'ogUrl' },
  { attr: 'property="og:image"', name: 'ogImg' },
  { attr: 'property="og:description"', name: 'ogDesc' },
];

const getPreviewData = (data: HtmlString) => {
  const pureData = data.replace(/[\r\n\t]/gm, '');
  const { title, metaTags } = parseHtml(pureData);

  const defaultMetaContents: Record<AttributeName, string | null> = {
    desc: null,
    ogTitle: null,
    ogUrl: null,
    ogImg: null,
    ogDesc: null,
  };

  const metaContents = previewAttributes.reduce((acc, { attr, name }) => {
    const metaTag = metaTags.find(tag => tag.includes(attr));
    if (!metaTag) return acc;

    const content = metaTag.split(/content="/)[1].split('"')[0];
    acc[name] = content;
    return acc;
  }, defaultMetaContents);

  return {
    title: metaContents.ogTitle ?? title,
    description: metaContents.ogDesc ?? metaContents.desc,
    imageUrl: metaContents.ogImg,
    domainName: metaContents.ogUrl,
  };
};

export default getPreviewData;
