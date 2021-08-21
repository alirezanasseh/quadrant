import React from 'react';
import Layout from './layout/layout';
import {Chart, Table} from './components';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    col: {
        width: '100%'
    }
});

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

export default App;
