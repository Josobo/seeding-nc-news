const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
const articles = require("../db/data/test-data/articles.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  it("responds with object containing all topics", () => {
    return request(app).get("/api/topics");
  });
});

describe("GET /api/users", () => {
  it("responds with object containing all users", () => {
    return request(app).get("/api/users");
  });
});

describe("GET /api/articles", () => {
  it("responds with object containing all articles", () => {
    return request(app).get("/api/articles");
  });
});

//GET /api/articles/:article_id
describe("GET /api/articles/:article_id", () => {
  test("responds with 200 and correct article property type for valid article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(1);
        expect(typeof body.article.article_id).toBe("number");
        expect(typeof body.article.title).toBe("string");
        expect(typeof body.article.topic).toBe("string");
        expect(typeof body.article.author).toBe("string");
        expect(typeof body.article.body).toBe("string");
        expect(typeof body.article.created_at).toBe("string");
        expect(typeof body.article.votes).toBe("number");
        expect(typeof body.article.article_img_url).toBe("string");
      });
  });
});

describe("errors", () => {
  test("404-Responds with path not found", () => {
    return request(app)
      .get("/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
  test("404-Responds with a valid id that does not exit", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id: 9999");
      });
  });

  test("400-Responds with bad request for invalid_id", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});
