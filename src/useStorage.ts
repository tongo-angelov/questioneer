import { useEffect, useState } from "react";

const getLocalData = (key: string, initial: any) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return initial;
};

export default function useStorage<T>(key: string, initial: T) {
    const [data, setData] = useState<T>(() => getLocalData(key, initial));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data]);

    return [data, setData] as [T, typeof setData];
}