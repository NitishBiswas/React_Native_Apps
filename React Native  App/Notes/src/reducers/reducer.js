/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
    data: [],
    count: 0,
};

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        // console.log(jsonValue)
        jsonValue != null ? initState.data = JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
        // saving error
    }
};

export const reducer = (state = initState, action) => {
    getData();
    if (action.type === 'Add_Data') {
        const addData = {
            ...state,
            data: [
                ...state.data,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    desc: action.payload.desc,
                    date: action.payload.date,
                },
            ],
            count: state.count + 1,
        };
        storeData(addData.data);
        return addData;
    } else if (action.type === 'Delete_Data') {

        const deleteData = {
            ...state,
            data: state.data.filter((note) => action.payload !== note.id),
        };
        storeData(deleteData.data);
        return deleteData;
    } else if (action.type === 'Update_Data') {
        const updateData = {
            ...state,
            data: state.data.map((note) => action.payload.id === note.id ? action.payload : note),
        };
        storeData(updateData.data);
        return updateData;
    }
    return state;
};
