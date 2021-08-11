module.exports = {
    purge: ["./**/*.html", "./**/*.js"],
    theme: {
        extend: {
            zIndex: {
                "-10": "-10",
            },
        },
    },
    variants: {
        extend: {
            translate: ["group-hover"],
        },
    },
    plugins: [],
};
