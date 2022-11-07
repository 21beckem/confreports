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

function confThumbnail(confObj) {
    return confObj.link.split('/').slice(0, -1).join('/') + '/' + confObj.thumbnail;
}

const AllConfs = {
    'October 2022' : {
        'link' : '/2022oct/',
        'thumbnail' : 'thumbnail.jpg'
    },
    'April 2022' : {
        'link' : '/2022april/',
        'thumbnail' : 'thumbnail.jpg'
    },
    'October 2021' : {
        'link' : '/2021oct/',
        'thumbnail' : 'thumbnail.png'
    },
    'April 2021' : {
        'link' : '/2021april/',
        'thumbnail' : 'thumbnail.jpg'
    },
    'October 2020' : {
        'link' : '/2020oct/',
        'thumbnail' : 'thumbnail.jpg'
    },
    'April 2020' : {
        'link' : '/2020april/',
        'thumbnail' : 'thumbnail.png'
    },
    '2010-2019' : {
        'link' : '/moreReports.html?name=2010-2019',
        'thumbnail' : 'moreReports/2010-2019.png',
        'included_confs' : {
            'October 2019' : {
                'link' : '/2019oct/',
                'thumbnail' : 'thumbnail.jpg'
            },
            'April 2019' : {
                'link' : '/2019april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2018' : {
                'link' : '/2018oct/',
                'thumbnail' : 'thumbnail.jpg'
            },
            'April 2018' : {
                'link' : '/2018april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2017' : {
                'link' : '/2017oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2017' : {
                'link' : '/2017april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2016' : {
                'link' : '/2016oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2016' : {
                'link' : '/2016april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2015' : {
                'link' : '/2015oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2015' : {
                'link' : '/2015april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2014' : {
                'link' : '/2014oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2014' : {
                'link' : '/2014april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2013' : {
                'link' : '/2013oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2013' : {
                'link' : '/2013april/',
                'thumbnail' : 'thumbnail.png'
            },
            'October 2012' : {
                'link' : '/2012oct/',
                'thumbnail' : 'thumbnail.png'
            },
            'April 2012' : {
                'link' : '/2012april/',
                'thumbnail' : 'thumbnail.png'
            }
        }
    }
}
