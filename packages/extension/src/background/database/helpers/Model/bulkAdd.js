import {
    getDB,
} from '../..';
import appendAutoFields from './helpers/appendAutoFields';


export default async function bulkAdd(modelName, items, config) {
    const {
        options: { networkId },
        modelConfig,
    } = config;

    const resultItems = items.map(item => appendAutoFields(item, modelConfig));

    return getDB(networkId)[modelName].bulkAdd(resultItems);
}
