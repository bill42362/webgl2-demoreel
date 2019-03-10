const readM3u8Info = ({ data }) => {
  const mediaType =
    data.mediaGroups && 0 < Object.keys(data.mediaGroups.AUDIO).length
      ? 'video'
      : 'image';
  const hasHd = !!data.playlists[2];
  return { mediaType, hasHd };
};

export default readM3u8Info;
