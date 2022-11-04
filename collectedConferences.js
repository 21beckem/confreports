class confList {
    constructor() {
        // you edit only these 2 lines of code!!!!  leave the quotes on both sides of the name!
        this.firstConference = "2012april";
        this.lastConference = "2022oct";
    }
    getList() {
        let firstConf = parseFloat(this.firstConference.replace('april', '.0').replace('oct', '.5'));
        let lastConf = parseFloat(this.lastConference.replace('april', '.0').replace('oct', '.5'));
        var confs = Array();
        let counter = firstConf;
        while (counter <= lastConf) {
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

const AllConfs = {
    'October 2022' : {
        'link' : '/2022oct/',
        'thumbnail' : '/2022oct/thumbnail.jpg'
    },
    'April 2022' : {
        'link' : '/2022april/',
        'thumbnail' : '/2022april/thumbnail.jpg'
    },
    'October 2021' : {
        'link' : '/2021oct/',
        'thumbnail' : '/2021oct/thumbnail.png'
    },
    'April 2021' : {
        'link' : '/2021april/',
        'thumbnail' : '/2021april/thumbnail.jpg'
    },
    'October 2020' : {
        'link' : '/2020oct/',
        'thumbnail' : '/2020oct/thumbnail.jpg'
    },
    'April 2020' : {
        'link' : '/2020april/',
        'thumbnail' : '/2020april/thumbnail.png'
    },
    '2010-2019' : {
        'link' : '/moreReports/?name=2010-2019',
        'thumbnail' : '/moreReports/2010-2019.png',
        'included_confs' : {
            'October 2019' : {
                'link' : '/2019oct/',
                'thumbnail' : '/2019oct/thumbnail.jpg'
            },
            'April 2019' : {
                'link' : '/2019april/',
                'thumbnail' : '/2019april/thumbnail.jpg'
            }
        }
    }
}
