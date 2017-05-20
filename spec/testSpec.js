describe("test", function(){

  var test;
  var jsdom = require("jsdom");

  // Create our beforeEach to before each it blocks

  describe("Hello world", function() {
    beforeEach(function(){
      test = require("../js/test.js");
    });
    it("says hello", function() {
      expect(test.helloWorld()).toEqual("Hello world!");
    });
  });
});
