from HTML_maker import IndexPage, FullPage
from ConferenceScraper import ConferenceScraper
import time, json, os

print("     Welcome to  ConfReports.org  Admin-Create-Conference")
print()
time.sleep(0.5)
print("What is the YEAR of the conference to be collected?")
year = int(input("> "))
print()
print("What is the MONTH of the conference to be collected? (4 or 10)")
month = int(input("> "))
print()

if not (month==4 or month==10):
    print("month invalid")
    exit()

#localFolder = year + ("oct" if month==10 else "april")
localFolder = '../aa_tempConf'

ConfScrape = ConferenceScraper(year, month)
confJson = ConfScrape.getConference()
if not os.path.exists(localFolder):
    os.makedirs(localFolder)
with open(localFolder +  '/data.json', 'w+', encoding='utf-8') as f:
    json.dump(confJson, f, ensure_ascii=False)
print()

indexdata = IndexPage.generateIndexHTML(confJson)
with open(localFolder +  '/index.html', 'w+', encoding='utf-8') as f:
    f.write(indexdata)
print()

fullText = FullPage.GenerateText()
with open(localFolder +  '/full.html', 'w+', encoding='utf-8') as f:
    f.write(fullText)
print()

print("done")