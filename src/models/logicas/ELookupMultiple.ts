export default class ELookupMultiple<T>{
    public results: T[]

    constructor(results?: T[]) {
        this.results = []
        if (results) {
            this.results = results;
        }
    }
}