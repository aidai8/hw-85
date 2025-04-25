import path from 'path';

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    fixturesPath: path.join(rootPath, 'fixtures'),
    db: 'mongodb://localhost:27017/hw-82',
    corsOptions() {

    }
};

export default config;