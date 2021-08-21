import {IData, IDataItem} from './data';

export interface IMainProvider {
    data?: IData;
    addItem?: (item: IDataItem) => void;
    removeItem?: (index: number) => void;
    editItem?: (index: number, item: IDataItem) => void;
}