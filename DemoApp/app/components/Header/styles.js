import Estylesheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

export default Estylesheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        '@media ios': {
            paddingTop: 20,
        },
        '@media (height: 812)': { // media queries
            paddingTop: 30,
        }
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        width: '100%',
    },
    plusWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    backWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    plusButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        color: '#52DF87',
        fontWeight: '200',
    }
})