/* eslint-disable prettier/prettier */
const initState = {
    data: [],
};

export const reducer = (state = initState, action) => {
    if (action.type === 'Add_Data') {
        return {
            ...state,
            data: [
                ...state.data,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    productCode: action.payload.productCode,
                    price: action.payload.price,
                    brand: action.payload.brand,
                    image1: action.payload.image1,
                },
            ],
        };
    } else if (action.type === 'Delete_Data') {
        return {
            ...state,
            data: state.data.filter(data => {
                return data.id !== action.payload;
            }),
        };
    }
    return state;
};