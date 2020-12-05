//щоб не використовувати багато разів require одного і того самого,
// створимо контейнер, де додамо залежності завдяки dependable
const dependable = require('dependable');
const path = require('path');

const container = dependable.container();
const simpleDependencies = [
    ['_','lodash'],
    ['passport', 'passport'],
    ['validator', 'express-validator'],
    ['formidable', 'formidable'],
    ['Club', './models/clubs'],
    ['async', 'async'],
    ['aws', './helpers/AWSUpload'],
    ['Users', './models/user'],
    ['Message', './models/message']

];


simpleDependencies.forEach(function (val){
    container.register(val[0], function (){
        return require(val[1]);
    })
});
//замість const _ = require('lodash');

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

container.register('container', function (){
    return container;
});

module.exports = container;