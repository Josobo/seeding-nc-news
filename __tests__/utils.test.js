const createRefObj = require("../db/utils");

describe("createRefObj", () => {
  test("Return an empty object when passed an empty array", () => {
    expect(createRefObj([])).toEqual({});
  });
  test("Return an object with a single key-value pair when passed an array containing a single object", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
      },
    ];
    const expected = { "Living in the shadow of a great man": 1 };
    expect(createRefObj(input, "title", "article_id")).toEqual(expected);
  });
  test("Return an object with a multiple key-value pair when passed an array containing a multiple object", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
      },
      {
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
      },
    ];
    const expected = {
      "Living in the shadow of a great man": 1,
      "Sony Vaio; or, The Laptop": 2,
    };
    expect(createRefObj(input, "title", "article_id")).toEqual(expected);
  });
});
