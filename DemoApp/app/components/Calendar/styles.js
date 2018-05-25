import Estylesheet from 'react-native-extended-stylesheet';

export default Estylesheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    agenda : {
        width: '100%'  ,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    dates: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        flexDirection:'column',
        paddingVertical: 25,
    },
   
    dateColumn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    dayContainer: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    month: {
        fontSize: 25,
        fontWeight: '900',
    },
    text: {
        fontSize: 12,
        fontWeight: '100',
    },
})