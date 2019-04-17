// ##############################
// // // GridSystem view styles
// #############################

const gridSystemStyle = {
  title: {
    color: "#3C4858",
    textDecoration: "none"
  },
  customTitle: {
    fontWeight: 'bold',
    marginRight: '10px',
    minWidth: '40px',
    "@media (max-width: 599px)": {
      textAlign: "left"
    }
  },
  customPage: {
    padding: '32px'
  },
  headerPage: {
    marginBottom: '32px',
    paddingBottom: '8px',
    display: 'flex',
    borderBottom: '#000000 solid 1px'
  },
  custUrl: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
  }
};

export default gridSystemStyle;
