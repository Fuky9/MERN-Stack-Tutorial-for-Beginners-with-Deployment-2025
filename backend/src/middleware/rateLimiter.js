import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Normally, you would want to use something unique to the user, like their IP address or user ID, instead of a static string. For simplicity, we're using a static string here, but in a real application, you should use something like `req.ip` or `req.user.id`.
    const { success } = await rateLimit.limit("my--rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }

    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
