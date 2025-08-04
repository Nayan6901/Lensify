const forgototpemail = ({ firstname, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Hi, ${firstname}</p>
      <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
      <p style="font-size: 24px; font-weight: bold;">${otp}</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>This OTP will expire in 10 minutes.</p>
    </div>
  `;
};

export default forgototpemail;
