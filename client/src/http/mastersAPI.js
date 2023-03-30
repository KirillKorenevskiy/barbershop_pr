import {$authHost, $host} from "./index";
export const createMasters = async (masters) => {
    try {
        const { data } = await $authHost.post('api/masters', masters);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Не удалось создать мастера');
    }
};
export const deleteMasterByName = async (masterName) => {
    try {
        const { data } = await $authHost.delete(`api/masters/${masterName}`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Не удалось удалить мастера');
    }
};
export const fetchMasters = async () => {
    try {
        const { data } = await $host.get('api/masters');
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Не удалось загрузить мастеров');
    }
};