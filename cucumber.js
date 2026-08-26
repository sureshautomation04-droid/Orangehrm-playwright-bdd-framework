module.exports = {
    default: {
        require: [
            "src/step-definitions/**/*.ts",
            "src/hooks/**/*.ts"
        ],
        paths: [
            "features/**/*.feature"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar"
        ]

    }
}