// import { createTheme } from '@mui/material/styles';
import { blue, green, grey, lightBlue, lightGreen } from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "#003366"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: green[500],
                    white: "#fff"
                },
                secondary: {
                    main: lightGreen[800],
                    midNightBlue: "#003366"
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "#003366",
                    white: "#003366"
                },
                secondary: {
                    main: blue[500],
                    midNightBlue: "#2196f3"
                },
                background: {
                    default: "#1e1e1e",
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});
