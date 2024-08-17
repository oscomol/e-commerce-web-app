import React, { useEffect, useState } from 'react';

const useGetOneWeek = () => {
    const [weeks, setWeeks] = useState([]);

    const today = new Date();

    const getLastWeek = () => {
        const lastWeek = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            lastWeek.push({
                date: date.toLocaleDateString(),
                day: getDayOfWeek(date.getDay())
            });
        }
        return lastWeek.reverse();
    };

    const getDayOfWeek = (dayIndex) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[dayIndex];
    };
    
    useEffect(() => {
        setWeeks(getLastWeek())
    }, []);

    return weeks;
};

export default useGetOneWeek;