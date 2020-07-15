import { Config } from '../models/config';

export const serverConfig = {
    getConfigs: (): Config => {
        return {
            MongodbConnection: `mongodb+srv://eatniaAdmin:wCxQf5X9qP89BmXJ@clusteralpha-f7lwc.mongodb.net/PracticeDB?retryWrites=true&w=majority`,
            ServiceHost: 'localhost',
            ServicePort: process.env.PORT || '3000'
        };
    }
};


// process.env.MongodbConnection || `mongodb://${process.env.MongoHost || 'localhost'}:27017/PracticeDB`,
// `mongodb+srv://eatniaAdmin:wCxQf5X9qP89BmXJ@clusteralpha-f7lwc.mongodb.net/PracticeDB?retryWrites=true&w=majority`
// `mongodb://${process.env.MongoHost || 'localhost'}:27017/PracticeDB`