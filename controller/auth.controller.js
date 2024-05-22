import CustomAPIError from "../errors/custom-error.js";

const otpVerify = async (req, res) => {
  try {
    const { otp } = req.body;
    if (
      !otp ||
      typeof otp !== "number" ||
      otp.toString().length !== 6 ||
      isNaN(otp)
    ) {
      throw new CustomAPIError("Please provide a valid OTP", 400);
    }

    if (otp.toString().slice(-1) === "7") {
      return res
        .status(400)
        .json({ message: "Verification Error: Last digit is 7" });
    }

    return res.status(200).json({ message: "Verification Successful" });
  } catch (error) {
    if (error instanceof CustomAPIError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { otpVerify };
