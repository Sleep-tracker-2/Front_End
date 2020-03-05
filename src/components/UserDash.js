import React from 'react';
import SleepGraphContainer from './SleepGraphContainer';
import NewEntry from './NewEntry.js';
import {  List, ListItem, Paper, Typography } from '@material-ui/core';
import { initialState } from '../reducers';

const UserDash = () => {
    return (
        <>
            <Paper maxWidth='md'>
                <SleepGraphContainer />
                <List id='sleepList'>
                    {initialState.sleep.data.map(sleep => {
                        return (
                            <ListItem
                                style={{ justifyContent: 'space-around' }}
                                key={Math.random() * 99 + 1}
                            >
                                <Typography variant='p' className='sleep-data'>
                                    Date: {sleep.day}
                                </Typography>
                                <Typography variant='p' className='sleep-data'>
                                    Hours: {sleep.hours}
                                </Typography>
                                <Typography variant='p' className='sleep-data'>
                                    Mood: {sleep.mood}
                                </Typography>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
};

export default UserDash;
