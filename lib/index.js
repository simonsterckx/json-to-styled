const EXPORT_PREFIX = "export ";

export function performTransform(
  str = "",
  {
    isTopLevel = false,
    isStyledComponents = true,
    /** use linebreaks to separate constants*/
    constants = "",
    isNative = true,
    useExport = true
  } = {}
) {
  const string = removeWhitespace(str);
  const jsObject = convertToJSObject(constants, string);

  const styledPrefix = isNative ? "styled.View" : "styled.div";

  let styleString = "";
  if (isTopLevel) {
    styleString = parseStyleObject(jsObject);
  } else {
    Object.entries(jsObject).forEach(([styleName, styles]) => {
      if (isStyledComponents) {
        const capitalLizedName = styleName.replace(/^\w/, c => c.toUpperCase());
        styleString += "\n";
        styleString += useExport ? EXPORT_PREFIX : "";
        styleString += `const Styled${capitalLizedName} = ${styledPrefix}\`\n${parseStyleObject(
          styles
        )}\n\``;
      } else {
        styleString += `\n.${styleName} {\n${parseStyleObject(styles)}\n}`;
      }
    });
  }

  return styleString;
}

// Remove spaces, whitespace, trailing commas
function removeWhitespace(str) {
  return (
    str
      // remove lines with comments
      .replace(/[//].*/g, "")
      .replace(/\s/g, "")
      .replace(/(^,)|(,$)/g, "")
  );
}

function convertToJSObject(constants = "", str = "") {
  const constantsArray = constants.split("\n");
  constantsArray.forEach(constant => {
    if (!constant) {
      return;
    }
    const re = new RegExp(`:(${constant}.+?(?=["',]))`, "g");
    str = str.replace(re, ':"$${$1}"');
  });
  // console.log("Performing eval on string: ", str);
  return eval(`\nglobalThis.result = ${str}`);
}

// Thanks to https://stackoverflow.com/a/45205645/719380
function parseStyleObject(jsObject) {
  const result = Object.entries(jsObject).reduce(
    (styleString, [propName, propValue], idx) => {
      propName = propName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
      if (typeof propValue === "number") {
        propValue = `${propValue}px`;
      }
      return `${styleString}${
        idx === 0 ? "  " : "\n  "
      }${propName}: ${propValue};`;
    },
    ""
  );
  return result;
}