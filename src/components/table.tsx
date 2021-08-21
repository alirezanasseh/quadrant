import React from 'react';
import {createUseStyles} from 'react-jss';
import {IField} from '../types/data';
import {ITableProps} from '../types/table';

export default function Table(props: React.PropsWithChildren<ITableProps>) {
    const {data, addItem, editItem, removeItem} = props;
    const classes = useStyles();

    const handleChange = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        if(editItem){
            editItem(index, e.currentTarget.name as IField, e.currentTarget.value);
        }
    };

    const handleAdd = () => {
        if(addItem){
            addItem({
                label: 'New',
                vision: 50,
                ability: 50
            });
        }
    };

    return (
        <div>
            <button className={classes.button} onClick={handleAdd}>Add</button>
            <div className={classes.tableContainer}>
                <table id={'table'}>
                    <thead>
                    <tr>
                        <th>Label</th>
                        <th>Vision</th>
                        <th>Ability</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) =>
                        <tr key={`tr-${index}`}>
                            <td>
                                <input
                                    type={'text'}
                                    name={'label'}
                                    value={item.label}
                                    onChange={(e) => handleChange(e, index)}
                                    key={`label-${index}`}
                                />
                            </td>
                            <td>
                                <input
                                    type={'number'}
                                    name={'vision'}
                                    value={item.vision}
                                    onChange={(e) => handleChange(e, index)}
                                    key={`vision-${index}`}
                                    max={100}
                                />
                            </td>
                            <td>
                                <input
                                    type={'number'}
                                    name={'ability'}
                                    value={item.ability}
                                    onChange={(e) => handleChange(e, index)}
                                    key={`ability-${index}`}
                                    max={100}
                                />
                            </td>
                            <td>
                                <button className={classes.button} onClick={() => removeItem(index)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const useStyles = createUseStyles({
    button: {
        backgroundColor: '#dfdfe5',
        border: '1px solid #bbbbc0',
        borderRadius: '5px',
        padding: '3px 10px'
    },
    tableContainer: {
        marginTop: '5px',
        '& table': {
            width: '100%',
        },
        '& th': {
            backgroundColor: '#a4b1bc',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'normal',
            '&:first-child': {
                width: '40%'
            }
        },
        '& input': {
            width: 'calc(100% - 10px)',
            border: '1px solid #bbbbc0',
            borderRadius: '5px',
            boxSizing: 'border-boxing',
            padding: '5px',

            '&:focus': {
                outline: '0px',
                border: '1px solid #264073',
                boxShadow: 'inset 0 0 2px #264073'
            }
        },
        '& button': {
            width: '100%'
        }
    },
});
