const fetch = require('node-fetch');

// Function to get Roblox user details by user ID
async function robloxStalk(userId) {
  try {
    // Fetch basic user details
    const userDetailsResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });

    if (!userDetailsResponse.ok) {
      throw new Error(`Failed to fetch user details. Status: ${userDetailsResponse.status}`);
    }

    const userDetails = await userDetailsResponse.json();

    // Fetch friends count
    const friendsResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });

    const friendsCount = friendsResponse.ok ? await friendsResponse.json() : { count: 0 };

    // Fetch followers count
    const followersResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });

    const followersCount = followersResponse.ok ? await followersResponse.json() : { count: 0 };

    // Fetch following count
    const followingResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });

    const followingCount = followingResponse.ok ? await followingResponse.json() : { count: 0 };

    // Combine all data into a single response
    return {
      status: 'success',
      user: {
        userId: userDetails.id,
        username: userDetails.name,
        displayName: userDetails.displayName,
        avatar: `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`,
        bio: userDetails.description || 'No bio available.',
        createdAt: userDetails.created,
        isBanned: userDetails.isBanned,
        friendsCount: friendsCount.count,
        followersCount: followersCount.count,
        followingCount: followingCount.count
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: 'An error occurred while fetching Roblox user data.',
      error: String(err)
    };
  }
}

// Serverless function handler
module.exports = async (req, res) => {
  const { query } = req;

  // Pastikan req.query tidak undefined
  if (!query) {
    return res.status(400).json({ status: false, error: 'Query parameters are missing' });
  }

  const { apikey, userId } = query;

  // Validasi API key
  const validApiKeys = (process.env.API_KEY || '').split(',');
  if (!validApiKeys.includes(apikey)) {
    return res.status(403).json({ status: false, error: 'Invalid API key' });
  }

  // Validasi userId parameter
  if (!userId) {
    return res.status(400).json({ status: false, error: 'User ID parameter is required' });
  }

  try {
    // Call the Roblox stalk function
    const result = await robloxStalk(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, error: `Error: ${error.message}` });
  }
};
