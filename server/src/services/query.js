const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query){
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

    const skip = (page -1) * limit;
    console.log(`from query page is ${page}`);
    console.log(`from limit page is ${limit}`);
    console.log(`from skip page is ${skip}`);
    return {
        skip,
        limit
    };
}

module.exports = {
    getPagination
};