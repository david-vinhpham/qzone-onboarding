import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
const listPageStyle = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  buttonDisplay:{
    position: "absolute",
    right: 0,
    top: 10,
    backgroundColor: "#d81b60",
    "&:hover,&:focus": {
      backgroundColor: "#d81b60"
    }
  }
};
export default listPageStyle;