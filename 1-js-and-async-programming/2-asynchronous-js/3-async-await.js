/*

  Challenge 3: Most Common Subscription for Harsh Reviewers

  Find the most common subscription among users who dislike more movies than they like.
  Use the methods in utils/mocked-api to get user and rating data.
  Check each user's likes vs. dislikes, filter those with more dislikes, and return the most frequent subscription.

  Requesites:
    - Use await with the methods from utils/mocked-api to get the data
    - Make sure to return a string containing the name of the most common subscription
*/

/**
 * Logs the most common subscription among users
 * who disliked more movies than they liked.
 *
 * @returns {Promise<string>} Logs the subscription name as a string.
 */

const mockedApi = require("./utils/mocked-api");

const getCommonDislikedSubscription = async () => {
  // Add your code here

  const users = await mockedApi.getUsers();
  const likesData = await mockedApi.getLikedMovies();
  const dislikesData = await mockedApi.getDislikedMovies();
  const usersWithMoreDislikes = users.filter((user) => {
    const userLikes = likesData.find((item) => item.userId === user.id);
    const userDislikes = dislikesData.find((item) => item.userId === user.id);

    const likesCount = userLikes ? userLikes.movies.length : 0;
    const dislikesCount = userDislikes ? userDislikes.movies.length : 0;

    return dislikesCount > likesCount;
  });

  const subPromises = usersWithMoreDislikes.map((user) =>
    mockedApi.getUserSubscriptionByUserId(user.id),
  );
  const subscriptionsResults = await Promise.all(subPromises);

  const counts = subscriptionsResults.reduce((acc, obj) => {
    const subName = obj.subscription;
    acc[subName] = (acc[subName] || 0) + 1;
    return acc;
  }, {});

  let mostCommon = "";
  let maxCount = 0;

  for (const subName in counts) {
    if (counts[subName] > maxCount) {
      maxCount = counts[subName];
      mostCommon = subName;
    }
  }

  return mostCommon;
};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
