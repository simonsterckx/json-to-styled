import performTransform from "../lib/index";

const example = `{
  todoCell: {
    backgroundColor: "white",
    borderColor: "whitesmoke",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 2,
    paddingLeft: "10px",
    paddingRight: "10px"
  }
};`;
const exampleWithComments = `{
  todoCell: {
    backgroundColor: "white",
    //borderColor: "whitesmoke",
  },
  todoCell2: {
    backgroundColor: "white",
    //borderColor: "whitesmoke",
  }
};`;
const exampleWithConstants = `{
  todoCell: {
    backgroundColor: "white",
    width: width - 10,
  },
};`;

test("Check that background-color is set to white", () => {
  const result = performTransform(example);
  expect(result.indexOf("background-color: white;")).toBeGreaterThan(-1);
});
test("Check that comments are removed", () => {
  const result = performTransform(exampleWithComments);
  expect(result.indexOf("border")).toBe(-1);
});
test("Ensure constants work", () => {
  const result = performTransform(exampleWithConstants, { constants: "width" });
  expect(result.indexOf("width: ${width-10};")).toBeGreaterThan(-1);
});
