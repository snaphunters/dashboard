import config from "../utils/ckeditor5config";

test("mediaEmbed html return function should return match in <video> tag", () => {
  expect(config.mediaEmbed.extraProviders.html("inputUrl")).toBe(
    '<video controls width="100%"><source src=inputUrl /></video>'
  );
});
