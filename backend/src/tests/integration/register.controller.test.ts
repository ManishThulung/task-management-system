import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import User from "../../models/user.model";

describe("User Registration Integration Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI_TEST);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user successfully", async () => {
    const userData = {
      name: "John Doe",
      email: "john@gmail.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(userData)
      .expect(201);
    expect(response.body).toHaveProperty("message", "register successful");
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should return 409 if user already exists", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    await User.create(userData);

    const response = await request(app)
      .post("/api/auth/register")
      .send(userData)
      .expect(409);
    expect(response.body).toHaveProperty(
      "message",
      "User already exist, Login instead!"
    );
  });

  it("should return 500 if there is a server error", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "erroruser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "internal server error");
  });
});
