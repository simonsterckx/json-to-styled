# JS-to-CSS generator (WIP)

Just a small helper I created to make it easier to switch between React JS-style objects and styled-components styling
Aimed at react-native but can be used quite easily with react-dom as well

# Example

From:

```
{
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
};
```

To:

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

## Note: uses eval() so don't use it on a server

This project is licensed under the terms of the MIT license.
