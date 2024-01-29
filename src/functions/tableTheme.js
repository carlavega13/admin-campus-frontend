import { createTheme} from '@mui/material/styles';

const customTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-cell': {
              fontFamily: 'Montserrat, sans-serif',
            },
          },
        },
      },
    },
  });
  export default customTheme
  