const axios = require('axios');

async function robloxStalk(username) {
  try {
    const idRes = await axios.post('https://users.roblox.com/v1/usernames/users', {
      usernames: [username],
      excludeBannedUsers: false
    });

    const user = idRes.data.data[0];
    if (!user) throw new Error('Username tidak ditemukan');

    const userId = user.id;

    const [info, avatar, friends, followers, badges, groups, games, onlineStatus] = await Promise.all([
      axios.get(`https://users.roblox.com/v1/users/${userId}`),
      axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png`),
      axios.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
      axios.get(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
      axios.get(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`),
      axios.get(`https://groups.roblox.com/v2/users/${userId}/groups/roles`),
      axios.get(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=All`),
      axios.post('https://presence.roblox.com/v1/presence/users', {
        userIds: [userId]
      })
    ]);

    return {
      id: userId,
      username: info.data.name,
      displayName: info.data.displayName,
      description: info.data.description,
      created: info.data.created,
      avatar: avatar.data.data[0]?.imageUrl || null,
      friendCount: friends.data.count,
      followerCount: followers.data.count,
      badges: badges.data.data,
      groups: groups.data.data.map(group => ({
        name: group.group.name,
        role: group.role.name
      })),
      gamesCreated: games.data.data.length,
      lastOnline: onlineStatus.data.userPresences[0]?.lastLocation || 'Offline'
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'An error occurred while processing the request.');
  }
}

module.exports = async (req, res) => {
  const { apikey, username } = req.query;

  if (!global.apikey || !global.apikey.includes(apikey)) {
    return res.status(401).json({ status: false, error: 'Apikey invalid' });
  }

  if (!username) {
    return res.status(400).json({ status: false, error: 'Username is required' });
  }

  try {
    const result = await robloxStalk(username);
    res.status(200).json({
      status: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};
