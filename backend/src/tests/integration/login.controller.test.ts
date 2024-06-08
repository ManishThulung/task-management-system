import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import User from "../../models/user.model";

describe("User Login Integration Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI_TEST);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should log in an existing user successfully", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    await request(app).post("/api/auth/register").send(userData).expect(201);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "login successful");
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should return 404 if the user does not exist", async () => {
    const loginData = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "User not found!");
  });

  it("should return 401 if the password is incorrect", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    await request(app).post("/api/auth/register").send(userData).expect(201);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Credentials");
  });
});
