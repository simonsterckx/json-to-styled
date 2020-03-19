# JS-to-CSS generator (WIP)

Just a small helper I created to make it easier to switch between React JS-style objects and styled-components styling
Aimed at react-native but can be used quite easily with react-dom as well.
You might wanna manually change styled.div to styled.[element]

# Example

https://simonsterckx.github.io/json-to-styled/
From:

`npm i json-to-styled`

```
import performTransform from "json-to-styled";

const styles = `{
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
};`
performTransform(styles)

```

Outputs:

```
export const StyledTodoCell = styled.View`
  background-color: white;
  border-color: whitesmoke;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: 2px;
  padding-left: 10px;
  padding-right: 10px;
`
```

## Warning: uses Function()/eval() so don't use it on a server or a production environment

This project is licensed under the terms of the MIT license.
