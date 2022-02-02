from bs4 import BeautifulSoup
from progress.bar import Bar
import requests, json, copy, re

class ConferenceScraper:
    # year must be 4 digit number str
    # month must be 2 digit number str
    def __init__(self, year, month):
        self.conf = None
        self.year = str(year)
        self.month = str(month)
        if len(self.month)==1:
            self.month = "0" + self.month
        self.monthLetter = "O" if self.month=='10' else "A"
    def gatherUrls(self):
        r = requests.get("https://scriptures.byu.edu/citation_index/gc_ajax/" + str(self.year) + "/" + self.monthLetter)
        soup = BeautifulSoup(r.content, 'html.parser')
        talkBlocks = soup.find_all("ul", class_="talksblock")
        sessionInfo = []
        sessionNames = []
        for session in talkBlocks:
            talksInfo = []
            sessionNames.append(session.previous_sibling.previous_sibling.get_text())
            while not session.li is None:
                onclick = session.li.a.attrs["onclick"]
                onclick = re.findall(r"\('\d*?'\)", onclick)[0]
                onclick = onclick[2:-2]
                talksInfo.append(onclick)
                session.li.decompose()
            sessionInfo.append(talksInfo)
        return sessionInfo, sessionNames

    def gatherTalk(self, talkId):
        r = requests.get("https://scriptures.byu.edu/content/talks_ajax/" + str(talkId))
        soup = BeautifulSoup(r.content, 'html.parser')
        speaker = soup.find_all('p', class_='author-name')[0].get_text()
        speaker = re.sub(r'^By', "", speaker, flags=re.IGNORECASE)
        speaker = re.sub(r'^\s+|\s+$', "", speaker)
        while not soup.sup is None:
            soup.sup.decompose()
        body = soup.find_all('div', class_='body-block')[0].get_text()
        return speaker, body

    def getConference(self):
        self.conf = {
            "date" : "",
            "name" : "",
            "sessions" : []
        }
        self.conf['name'] = ("October " if self.month=='10' else "April ") + str(self.year) + ' General Conference'
        self.conf['date'] = str(self.month) + "-" + str(self.year)
        allUrls, sessionNames = self.gatherUrls()
        total = 0
        for sessionData in allUrls:
            for talkId in sessionData:
                total += 1
        with Bar('Gathering Talks...', max=total, fill='■', suffix='%(percent).1f%% - %(eta)ds') as bar:
            for i in range(len(allUrls)):
                thisSession = {
                    "name" : sessionNames[i],
                    "talks" : []
                }
                for ii in range(len(allUrls[i])):
                    speaker, text = self.gatherTalk(allUrls[i][i])
                    speaker = re.sub(u'\xa0', u' ', speaker)
                    text = re.sub(u'\xa0', u' ', text)
                    newTalk = {
                        "speaker" : speaker,
                        "talkText" : text
                    }
                    thisSession['talks'].append(newTalk)
                    bar.next()
                self.conf['sessions'].append(thisSession)
        return self.conf
        
            

if __name__ == '__main__':
    thisConf = ConferenceScraper(2020, 4)
    content = thisConf.getConference()
    print(content)