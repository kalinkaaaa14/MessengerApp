const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: "AKIAJFC2YONWG4R23HFQ",
    secretAccessKey: "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",
    region: 'eu-central-1'
});

const s0 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'chatapprp',
        acl: 'public-read',
        metadata(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key(req, file, cb){
            cb(null, file.originalname);
        }
    }),

    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
})

exports.Upload = upload;
