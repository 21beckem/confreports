from progress.bar import Bar
import os, re, json, time
d = os.path.abspath(os.path.join(os.getcwd(), os.pardir))
dirs = [os.path.join(d, o) for o in os.listdir(d) if os.path.isdir(os.path.join(d,o)) and ('april' in o or 'oct' in o)]

class FullPage:
    def GenerateText():
        with Bar('Making Full Page...', max=100, fill='■', suffix='%(percent).1f%% - %(eta)ds') as bar:
            for i in range(100):
                time.sleep(0.002)
                bar.next()
        return '''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <script src="../head.js"></script>
    <script src="../fulltalkscss.js"></script>
    <script src="../loadingcss.js"></script>
    <script src="../conference.js"></script>
</head>
<body>
    <script src="../header.js"></script><script>write("full");</script>
    <script src="../fulltxtOpenMain.js"></script>

    <h3 id="confName"></h3>
    <div id="loading"><script src="../loadinghtml.js"></script></div>
    <div id="TalksContainer"></div>
    <script src="../loadfulldatajson.js"></script>

    <script src="../closeMain.js"></script>
</body>
</html>'''

class IndexPage:
    commonWords = ["tis","twas","able","about","across","after","ain't","all","almost","also","among","and","any","are","aren't","because","been","but","can","can't","cannot","could","could've","couldn't","dear","did","didn't","does","doesn't","don't","either","else","ever","every","for","from","get","got","had","has","hasn't","have","he'd","he'll","he's","her","hers","him","his","how","how'd","how'll","how's","however","i'd","i'll","i'm","i've","into","isn't","it's","its","just","least","let","like","likely","may","might","might've","mightn't","most","must","must've","mustn't","neither","nor","not","off","often","only","other","our","own","rather","said","say","says","shan't","she","she'd","she'll","she's","should","should've","shouldn't","since","some","than","that","that'll","that's","the","their","them","then","there","there's","these","they","they'd","they'll","they're","they've","this","tis","too","twas","wants","was","wasn't","we'd","we'll","we're","were","weren't","what","what'd","what's","when","when","when'd","when'll","when's","where","where'd","where'll","where's","which","while","who","who'd","who'll","who's","whom","why","why'd","why'll","why's","will","with","won't","would","would've","wouldn't","yet","you","you'd","you'll","you're","you've","your"]
    def stripOfSpecialChars(strg):
        strg = re.sub(r'(\r\n|\n|\r)', " ", strg)
        strg = re.sub(r'\.\s+', " ", strg)
        strg = re.sub(r'[,;\:"\?\!\$%#_\{\}&\=\+\(\)\^\[\]\<\>\*\|]', " ", strg)
        strg = re.sub(r'[\›\·\.\—\«\»\©\®\¶\¿\±\¬\¢\£\¤\¥\§\¯\°\-\–\\]', " ", strg)
        strg = re.sub(r'\s+', " ", strg)
        strg = re.sub(r'\.\.', " ", strg)
        strg = re.sub(r'\.\.\.', " ", strg)
        strg = re.sub(r'\' ', " ", strg)
        strg = re.sub(r' \'', " ", strg)
        strg = re.sub(r'^[a-zA-Z]{1,2}$', "", strg)
        strg = re.sub(r'[…“”,.;\:"\?\!\$%#_\{\}&\=\+\(\)\^\[\]\<\>\*\|]', "", strg)
        strg = re.sub(r'\s{2,}', " ", strg)
        strg = re.sub(r'(^\s*)|(\s*$)', "", strg)
        strg = re.sub(r'[ ]{2,}', " ", strg)
        return re.sub(r'\n ', "\n", strg)
    def countWords(wholeTxt):
        everyWord = IndexPage.stripOfSpecialChars(wholeTxt).lower().split()
        u = []
        with Bar('Parsing Part 1...', max=len(everyWord), fill='■', suffix='%(percent).1f%% - %(eta)ds') as bar:
            for i in everyWord:
                if len(i) > 3 and i not in IndexPage.commonWords:
                    if i not in u:
                        u.append(i)
                bar.next()
        w = []
        with Bar('Parsing Part 2...', max=len(u), fill='■', suffix='%(percent).1f%% - %(eta)ds') as bar:
            for i in u:
                w.append([i, everyWord.count(i)])
                bar.next()
        w.sort(key = lambda x: -x[1])
        return w
    def makeTable(wholeTxt, title):
        words = IndexPage.countWords(wholeTxt)
        w = '<h2 id="thisDataTitle">' + title + ' Report</h2>\n\n'
        w += '<table id="tfTableA" class="tfalt"><tr><td style="padding:10px;"><strong>Primary<br>Keywords</strong></td><td><strong>Frequency</strong></td></tr>'
        with Bar('Making Table...', max=len(words), fill='■', suffix='%(percent).1f%% - %(eta)ds') as bar:
            for wordData in words:
                w += '<tr><td>' + str(wordData[0]) + '</td><td>' + str(wordData[1]) + "</td></tr>"
                bar.next()
        w += '</table>'
        return w
    def wholeTextFromJson(thisConf):
        wholeTxt = ""
        for i in thisConf["sessions"]:
            for ii in i["talks"]:
                wholeTxt += ii["talkText"]
        return wholeTxt;
    def makeIndexPage(wholeTxt, title):
        p = '''<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>April 2012 Conference Report</title>
        <script src="../head.js"></script>
    </head>
    <body>
        <script src="../header.js"></script><script>write("overview");</script>
        <script src="../openMain.js"></script>'''
        p += IndexPage.makeTable(wholeTxt, title)
        p += '''<script src="../closeMain.js"></script>
    </body>
    </html>'''
        return p
    def generateIndexHTML(confJson):
        return IndexPage.makeIndexPage(IndexPage.wholeTextFromJson(confJson), confJson['name'])

if __name__ == '__main__':
    #for folder in dirs:
    f = open(dirs[4] + '\\\\data.json', "r", encoding="utf8")
    confJson = json.load(f)
    contents = IndexPage.generateIndexHTML(confJson)
    print(contents)
    f.close()