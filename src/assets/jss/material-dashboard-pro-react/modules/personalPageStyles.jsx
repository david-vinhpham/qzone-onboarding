const personalPageStyles = {
  summary: {
    justifyContent: 'space-between',
    '& > :last-child': {
      padding: 0,
    },
  },
  phoneNumber: {
    marginBottom: 17,
    paddingTop: 31,
    '& > div > div > div:first-child': {
      border: 'none',
      '& > img': {
        verticalAlign: 'top',
      },
    },
    '& input': {
      background: 'none',
      '&:focus': {
        borderColor: '#303f9f',
        borderWidth: 2,
      },
    },
  },
};

export default personalPageStyles;
