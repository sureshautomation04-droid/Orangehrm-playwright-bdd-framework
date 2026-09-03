module.exports = {
    default: {
        require: [
            "src/step-definitions/**/*.ts",
            "src/hooks/**/*.ts"
        ],
        paths: [
            "features/login.feature",
            "features/pim.feature",
            "features/searchbyemployeeid.feature",
            "features/deleteemployeeid.feature",
            
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar"
        ]

    }
}