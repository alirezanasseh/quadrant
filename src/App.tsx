import React from 'react';
import Layout from './layout/layout';
import {Chart, Table} from './components';
import {createUseStyles} from 'react-jss';

function App() {
    const classes = useStyles();

    return (
        <Layout title={'Home'}>
            <div className={classes.row}>
                <div className={classes.col}>
                    <Chart/>
                </div>
                <div className={classes.col}>
                    <Table/>
                </div>
            </div>
        </Layout>
    );
}

const useStyles = createUseStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        '@media (max-width: 1024px)': {
            flexDirection: 'column'
        }
    },
    col: {
        width: '100%',

        '@media (max-width: 1024px)': {
            marginBottom: '10px'
        }
    }
});

export default App;
