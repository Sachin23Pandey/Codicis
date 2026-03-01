

const axios = require("axios");

const JUDGE0_API = process.env.JUDGE0_API_URL;

const LANGUAGE_MAP = {
  python: 71,
  javascript: 63,
  typescript: 74,
  java: 62,
  csharp: 51,
  php: 68,
};

module.exports.executeCode = async (req, res) => {
  const { language, sourceCode } = req.body;

  const language_id = LANGUAGE_MAP[language];

  if (!language_id) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const submission = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: sourceCode,
        language_id: language_id,
      }
    );

    const token = submission.data.token;

    let result;
    while (true) {
      const response = await axios.get(
        `${JUDGE0_API}/submissions/${token}?base64_encoded=false`
      );

      if (response.data.status.id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        result = response.data;
        break;
      }
    }

    res.json({
      run: {
        output:
          result.stdout ||
          result.stderr ||
          result.compile_output ||
          "No output",
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Execution failed",
    });
  }
};