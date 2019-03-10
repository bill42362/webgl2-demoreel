// setupPusherChannels.js
'use strict';

export const setupPusherChannels = ({
  socket,
  state: { userId = null, chatroomId = null },
  options: { otherChannelNames = [] } = {},
}) => {
  const newChannelNames = [].concat(otherChannelNames);

  newChannelNames.push('public-swag');

  if (userId) {
    newChannelNames.push(`private-user@${userId}`);
  }
  if (chatroomId) {
    newChannelNames.push(`presence-swag.chat.${chatroomId}`);
  }

  const subscribedChannelNames = socket
    .allChannels()
    .map(channel => channel.name);

  const shouldSubscribeChannelNames = newChannelNames.filter(
    name => !subscribedChannelNames.includes(name)
  );
  shouldSubscribeChannelNames.forEach(channelName =>
    socket.subscribe(channelName)
  );

  const shouldUnsubscribeChannels = subscribedChannelNames.filter(
    name => !newChannelNames.includes(name)
  );
  shouldUnsubscribeChannels.forEach(channelName => {
    const channel = socket.channel(channelName);
    channel.unbind();
    return socket.unsubscribe(channelName);
  });

  return socket;
};

export default setupPusherChannels;
