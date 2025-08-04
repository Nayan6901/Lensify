const verifyemail1 = ({ firstname, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Hi <strong>${firstname}</strong>,</p>
      <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
      <p>
        <a href="${url}" 
           style="background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
      </p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${url}</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  `;
};

export default verifyemail1;
