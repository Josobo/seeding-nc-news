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
  test("responds with an array of topics with correct properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.topics)).toBe(true);
        res.body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/users", () => {
  test("responds with an array of users with correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.users)).toBe(true);
        res.body.users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
      });
  });
  test("responds with articles with correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("articles");
        res.body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
          expect(article).not.toHaveProperty("body");
        });
      });
  });
  test("responds with articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

//GET /api/articles/:article_id
describe("GET /api/articles/:article_id", () => {
  test("responds with 200 and correct article property type for valid article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(1);
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
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

//GET /api/articles/:article_id/comments
describe("GET /api/articles/:article_id/comments", () => {
  test("responds with an array of comments for a given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.comments)).toBe(true);
      });
  });
  test("responds with each comment to have properties comment_id, votes, created_at, author, body, article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
        });
      });
  });
  test("responds with comment sorted by the most recent comments first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("responds with an empty array when article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("400-Responds with bad request for invalid article_id", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });

  test("404-Responds with a valid article id that does not exit", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id: 9999");
      });
  });
});

//POST /api/articles/:article_id/comments
describe("GET /api/articles/:article_id/comments", () => {
  test("adds a comment to an article and responds with the posted comment", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "icellusedkars",
        body: "This is an interesting article!",
      })
      .then(({ body }) => {
        expect(body).toHaveProperty("comment");
        expect(body.comment).toMatchObject({
          author: "icellusedkars",
          body: "This is an interesting article!",
          article_id: 2,
        });
        expect(body.comment).toHaveProperty("comment_id");
        expect(body.comment).toHaveProperty("created_at");
        expect(body.comment).toHaveProperty("votes");
      });
  });
  test("responds with 400 when request body is missing required fields", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "icellusedkars",
      })
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("msg", "Invalid input");
      });
  });

  test("responds with 404 when article does not exist", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({
        username: "icellusedkars",
        body: "This is an interesting article!",
      })
      .then(({ status, body }) => {
        expect(status).toBe(404);
        expect(body).toHaveProperty(
          "msg",
          "No article found for article_id: 9999"
        );
      });
  });

  test("responds with 400 for invalid article_id", () => {
    return request(app)
      .post("/api/articles/notAnId/comments")
      .send({
        username: "icellusedkars",
        body: "This is an interesting article!",
      })
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("msg", "Invalid input");
      });
  });

  test("responds with 404 when username does not exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "notUser",
        body: "This is an interesting article!",
      })
      .then(({ status, body }) => {
        expect(status).toBe(404);
        expect(body).toHaveProperty("msg", "Username not found");
      });
  });
});

//PATCH /api/articles/:article_id
describe('PATCH "/api/articles/:article_id"', () => {
  test("PATCH updates the votes of an article and returns it", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("article_id", 1);
        expect(res.body).toHaveProperty("votes");
        expect(typeof res.body.votes).toBe("number");
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("author");
        expect(res.body).toHaveProperty("body");
        expect(res.body).toHaveProperty("topic");
      });
  });

  test("PATCH returns 400 if inc_votes is missing", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .then((res) => {
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty("msg", "missing votes");
      });
  });

  test("PATCH returns 404 if article_id does not exist", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 1 })
      .then((res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty(
          "msg",
          "No article found for article_id: 9999"
        );
      });
  });
});

//DELETE /api/comments/:comment_id

describe('DELETE "/api/comments/:comment_id"', () => {
  test('DELETE "/api/comments/:comment_id" deletes the given comment and returns 204', () => {
    return request(app)
      .delete("/api/comments/3")
      .then((res) => {
        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
      });
  });

  test('DELETE "/api/comments/:comment_id" with non-existent ID returns 404', () => {
    return request(app)
      .delete("/api/comments/9999")
      .then((res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({
          msg: "Comment not found for comment_id: 9999",
        });
      });
  });

  test('DELETE "/api/comments/:comment_id" with invalid ID returns 400', () => {
    return request(app)
      .delete("/api/comments/notAnId")
      .then((res) => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
          msg: "Invalid input",
        });
      });
  });
});
