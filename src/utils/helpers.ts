import { Question } from '../context/types';

export const randomize = (data: Question[]) => {
    return data.map((item) => ({ ...item, _random: Math.random() })).sort((a, b) => a._random - b._random);
};