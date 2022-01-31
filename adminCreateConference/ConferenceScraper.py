from bs4 import BeautifulSoup
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
    emptyConf = {
        "date" : "",
        "name" : "",
        "sessions" : []
    }
    emptySession = {
        "name" : "",
        "talks" : []
    }
    emptyTalk = {
        "speaker" : "",
        "talkText" : ""
    }
    def gatherUrls(self):
        r = requests.get("https://scriptures.byu.edu/citation_index/gc_ajax/" + str(self.year) + "/" + self.monthLetter)
        soup = BeautifulSoup(r.content, 'html.parser')
        talkBlocks = soup.find_all("ul", class_="talksblock")
        sessionInfo = []
        for session in talkBlocks:
            talksInfo = []
            while not session.li is None:
                #print(session.li.a)
                onclick = session.li.a.attrs["onclick"]
                onclick = re.findall(r"\('\d*?'\)", onclick)[0]
                onclick = onclick[2:-2]
                talksInfo.append(onclick)
                session.li.decompose()
            sessionInfo.append(talksInfo)
        return sessionInfo

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
        self.conf = copy.deepcopy(ConferenceScraper.emptyConf)
        self.conf['date'] = str(self.month) + "-" + str(self.year)
        for sessionData in self.gatherUrls():
            for talkId in sessionData:
                speaker, text = self.gatherTalk(talkId)
        
            

if __name__ == '__main__':
    thisConf = ConferenceScraper(2020, 4)
    thisConf.getConference()