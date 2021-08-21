import {IData, IDataItem, IField} from './data';

export interface IMainProvider {
    data?: IData;
    addItem?: (item: IDataItem) => void;
    removeItem?: (index: number) => void;
    editItem?: (index: number, field: IField, value: string | number) => void;
}