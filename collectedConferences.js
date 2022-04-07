class confList {
    constructor() {
        // you edit only these 2 lines of code!!!!  leave the quotes on both sides of the name!
        this.firstConference = "2012april";
        this.lastConference = "2022april";
    }
    getList() {
        let firstConf = parseFloat(this.firstConference.replace('april', '.0').replace('oct', '.5'));
        let lastConf = parseFloat(this.lastConference.replace('april', '.0').replace('oct', '.5'));
        var confs = Array();
        let counter = firstConf;
        while (counter < lastConf) {
            let fname = this.indexToFolderName(counter);
            confs.push(fname);
            counter += 0.5;
        }
        confs.reverse();
        this.list = confs;
        return this.list;
    }
    indexToFolderName(thisI) {
        return Number.isInteger(thisI) ? thisI + 'april' : Math.floor(thisI) + 'oct';
    }
}