import crypto from "crypto";

const secretKey = "your_secret_key";

export const encryptValue = (value: string) => {
  try {
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encryptedEmail = cipher.update(value, "utf-8", "hex");
    encryptedEmail += cipher.final("hex");
    return encryptedEmail;
  } catch (error) {
    throw error;
  }
};

export const decryptValue = (value: string) => {
  try {
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decryptedEmail = decipher.update(value, "hex", "utf-8");
    decryptedEmail += decipher.final("utf-8");
    return decryptedEmail;
  } catch (error) {
    throw error;
  }
};
