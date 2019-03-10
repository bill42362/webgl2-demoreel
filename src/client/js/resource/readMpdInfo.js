const readMpdInfo = ({ data }) => {
  const { AdaptationSet } = data.Period[0];
  const audioSet = AdaptationSet.filter(
    adap => 'audio' === adap.$.contentType
  )[0];
  const videoSet = AdaptationSet.filter(
    adap => 'video' === adap.$.contentType
  )[0];
  const mediaType = audioSet ? 'video' : 'image';
  const hasHd =
    videoSet && videoSet.Representation && !!videoSet.Representation[2];
  return { mediaType, hasHd };
};

export default readMpdInfo;
