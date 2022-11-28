const REP = /<script>([\s\S]+?)<\/script>/ 

module.exports = (source) => {
    const __source = source.match(REP)
    return __source && __source[1] ? __source[1] : source
} 