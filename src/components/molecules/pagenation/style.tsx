import { withStyles } from '@material-ui/core/styles';
import MuiPagination from '@material-ui/lab/Pagination';

export const Pagination = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  ul: {
    display: 'flex',
    gap: '10px',
    '& li': {
      '&:hover button': {
        backgroundColor: '#E0E0E0',
      },
      '&:first-child': {
        marginRight: '33px',
      },
      '&:last-child': {
        marginLeft: '33px',
      },
      '& button, & div': {
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
      },
    },
    '& .MuiPaginationItem-root': {
      margin: '0',
      color: 'gray',
      fontSize: '14px',
      fontWeight: '700',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#0A6ABF',
      color: '#fff',
    },
  },
})(MuiPagination);
