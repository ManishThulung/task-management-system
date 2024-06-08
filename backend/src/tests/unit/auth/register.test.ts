const { isExist, createUser } = require("../../../services/auth.services");
const User = require("../../../models/user.model");
const ErrorHandler = require("../../../utils/ErrorHandler");

jest.mock("../../../models/user.model", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("Auth Services", () => {
  describe("isExist", () => {
    it("should return true if user exists with the given email", async () => {
      const email = "test@example.com";
      User.findOne?.mockResolvedValue({ email });
      const result = await isExist(email);
      expect(result).toBe(true);
    });

    it("should return false if user does not exist with the given email", async () => {
      const email = "nonexistent@example.com";
      User.findOne?.mockResolvedValue(null);
      const result = await isExist(email);
      expect(result).toBe(false);
    });

    it("should return false if an error occurs during database query", async () => {
      const email = "test@example.com";
      User.findOne.mockRejectedValue(new Error("internal server error"));
      await expect(isExist(email)).rejects.toThrow(Error);
    });
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      const name = "Test User";
      const email = "test@example.com";
      const password = "password123";
      User.create?.mockResolvedValue({ name, email, password });
      const result = await createUser(name, email, password);
      expect(result).toEqual({ name, email, password });
    });

    it("should throw an error if user creation fails", async () => {
      const name = "Test User";
      const email = "test@example.com";
      const password = "password123";
      User.create.mockRejectedValue(new Error("Database error"));
      await expect(createUser(name, email, password)).rejects.toThrow(Error);
    });
  });
});
