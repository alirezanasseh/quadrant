import React, {createContext, useState} from 'react';
import {IMainProvider} from '../types/mainProvider';
import {IData, IDataItem, IField} from '../types/data';

export const MainContext = createContext<IMainProvider>({});

const MainProvider = (props: React.PropsWithChildren<{}>) => {
    // Checking first time load
    const visitedBefore = localStorage.getItem('visitedBefore');
    if(!visitedBefore){
        // Initialize data
        const initialData: IData = [
            {
                label: '1',
                vision: 10,
                ability: 10
            },
            {
                label: '2',
                vision: 40,
                ability: 40
            },
            {
                label: '3',
                vision: 80,
                ability: 30
            }
        ];
        localStorage.setItem('data', JSON.stringify(initialData));

        // Set visited before
        localStorage.setItem('visitedBefore', 'true');
    }

    // Getting data from local storage
    const savedData = localStorage.getItem('data');
    const dataObj = savedData ? JSON.parse(savedData) : [];

    // Adding a new item to the list
    const addItem = (item: IDataItem) => {
        // Add to the state
        let newData = state.data ? [...state.data] : [];
        newData.push(item);
        setState({...state, data: newData});

        // Update local storage data
        updateLocalStorageData(newData);
    }

    // Removing an item from the list by index
    const removeItem = (index: number) => {
        if(!state.data || state.data.length === 0){
            return;
        }

        // Removing from state
        let newData = [...state.data];
        newData.splice(index, 1);
        setState({...state, data: newData});

        // Update local storage data
        updateLocalStorageData(newData);
    };

    // Editing an item in the list
    const editItem = (index: number, field: IField, value: string | number) => {
        if(!state.data || state.data.length === 0){
            return;
        }

        // Updating state
        let newData = [...state.data];
        newData[index] = {...newData[index], [field]: value};
        setState({...state, data: newData});

        // Update local storage data
        updateLocalStorageData(newData);
    };

    const updateLocalStorageData = (newData: IData) => {
        if(!newData){
            newData = [];
        }
        localStorage.setItem('data', JSON.stringify(newData));
    };

    const [state, setState] = useState<IMainProvider>({
        data: dataObj,
        addItem,
        removeItem,
        editItem
    });

    return (
        <MainContext.Provider value={state}>
            {props.children}
        </MainContext.Provider>
    );
}

export default MainProvider;