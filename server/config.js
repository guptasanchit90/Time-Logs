exports.argv = (() => {
    const arguments = {};
    process.argv.slice(2).map((element) => {
        const matches = element.match('--([a-zA-Z0-9]+)=(.*)');
        if (matches) {
            arguments[matches[1]] = matches[2]
                .replace(/^['"]/, '').replace(/['"]$/, '');
        }
    });
    return arguments;
})();