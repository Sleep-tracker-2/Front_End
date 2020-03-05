import React from 'react';
import SleepGraphContainer from './SleepGraphContainer';
import NewEntry from './NewEntry.js';
import { Container, List, ListItem } from '@material-ui/core';
import { initialState } from '../reducers';
const UserDash = () => {
    return (
        <>
            <Container maxWidth='md'>
                <SleepGraphContainer />
                <List id='sleep-list'>
                    {initialState.sleep.map(sleep => {
                        return (
                            <ListItem
                                className='sleep-list-item'
                                key={Math.random() * 99 + 1}
                            >
                                <p className='sleep-data'>Date: {sleep.day}</p>
                                <p className='sleep-data'>
                                    Hours: {sleep.hours}
                                </p>
                                <p className='sleep-data'>Mood: {sleep.mood}</p>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </>
    );
};

export default UserDash;
