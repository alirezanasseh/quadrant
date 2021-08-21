import {IData, IField} from './data';

export interface IChartProps {
    data: IData | undefined;
    editItem: (index: number, field: IField, value: string | number) => void;
}