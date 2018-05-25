import Estylesheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

export default Estylesheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
        marginVertical: 10,
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#52DF87',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '300',
    },
    buttonContainer: {
        padding: 25,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#52DF87',
        borderRadius: 10,
    },
    largeText: {
        fontSize: 25,
        fontWeight: '900',
    },
    smallText: {
        fontSize: 12,
        fontWeight: '100',
    },
})