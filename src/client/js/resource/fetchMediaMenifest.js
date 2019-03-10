// fetchMediaMenifest.js
import 'isomorphic-fetch';
import parseM3u8 from './parseM3u8.js';
import parseXml from './parseXml.js';

const CONTENT_TYPE = {
  m3u8: 'vnd.apple.mpegURL',
  mpd: 'dash+xml',
};

const parsers = {
  m3u8: parseM3u8,
  mpd: parseXml,
};

const mediaUrl = process.env.MEDIA_URL;

/**
 * Fetch the media menifest
 * @param {String} { id } - the message id
 * @param {String} { [ type ] } - the media type
 */
const fetchMediaMenifest = async ({ id, type = 'm3u8' }) => {
  const fetchOpts = {
    headers: {
      'Content-Type': CONTENT_TYPE[type],
    },
  };
  const url = new URL(`/${id}.${type}`, mediaUrl);
  const response = await fetch(url.href, fetchOpts);

  if (!response.ok) {
    throw new Error(`fetch_menifest_error [${response.status}]`);
  }

  const text = await response.text();
  const parsedData = await parsers[type]({ data: text });

  return { [type]: parsedData };
};

export default fetchMediaMenifest;
