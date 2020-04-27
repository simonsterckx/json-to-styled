import performTransform from "./lib/index.js";

const form = document.querySelector("form");
const constantsArea = document.getElementById("constants");
const textarea = document.getElementById("json");
const isTopLevelSwitch = document.getElementById("isTopLevelSwitch");
const isStyledComponentsSwitch = document.getElementById("isStyledComponents");
const isNativeSwitch = document.getElementById("isNativeSwitch");
const result = document.getElementById("result");
const errorTag = document.getElementById("error");

// Default constants
constantsArea.value = `width\nheight\nStyleSheet.absoluteFillObject\nStyleSheet.hairlineWidth`;

// Default example
textarea.value = `{
  todoCell: {
    backgroundColor: "white",
    borderColor: "whitesmoke",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 2,
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
}`;

const handleFormSubmit = () => {
  try {
    const isTopLevel = isTopLevelSwitch.checked;
    const isStyledComponents = isStyledComponentsSwitch.checked;
    const isNative = isNativeSwitch.checked;

    const constants = constantsArea.value;

    const styleString = performTransform(textarea.value, {
      constants,
      isStyledComponents,
      isNative,
      isTopLevel,
    });

    result.innerHTML = styleString;
    errorTag.innerText = "";
  } catch (e) {
    result.innerHTML = "";
    errorTag.innerText = `${e.message}\n${e.stack}`;
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  handleFormSubmit();
  return false;
};

handleFormSubmit();
