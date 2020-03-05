import React from 'react';
import SleepGraphContainer from './SleepGraphContainer';
import NewEntry from './NewEntry.js';
import { Container } from '@material-ui/core';

const UserDash = () => {
    return (
        <>
            <Container maxWidth='md'>
                <SleepGraphContainer />
            </Container>
        </>
    );
};

export default UserDash;
