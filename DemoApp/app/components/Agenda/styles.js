import Estylesheet from 'react-native-extended-stylesheet';

export default Estylesheet.create({
    container: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
    },
    textContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollWrapper: {
        width: '100%',
        marginBottom: 25,
        paddingBottom: 5,
    },
    cardWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
        paddingVertical: 5,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        height: 100,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    line: {
        backgroundColor: '#52DF87',
        height: '95%',
        width: 2,
        borderRadius: 1,
    },
    content: {
        width: '100%',
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 12,
        fontWeight: '100',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    }
})