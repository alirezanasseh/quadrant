import React, {useContext} from 'react';
import {createUseStyles} from 'react-jss';
import {MainContext} from '../context/mainProvider';

export default function Table() {
    const classes = useStyles();
    const {data, addItem, editItem, removeItem} = useContext(MainContext);

    return (
        <div>
            <button className={classes.button}>Add</button>
            <div className={classes.tableContainer}>
                <table>
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
                        <tr>
                            <td>
                                <input type={'text'} value={item.label}/>
                            </td>
                            <td>
                                <input type={'number'} value={item.vision}/>
                            </td>
                            <td>
                                <input type={'number'} value={item.ability}/>
                            </td>
                            <td>
                                <button className={classes.button}>Delete</button>
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
