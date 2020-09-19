import json
import nltk
import operator
from nltk.corpus import stopwords 


if __name__ == "__main__":
	with open("./message.json", "r") as f:
		jsonObj = json.loads(f.read())
		messages = jsonObj["messages"]
		stop_words = set(stopwords.words('english')) 
		wordDict = {}
		
		for msg in range(100000):
			try :
				message = messages[msg]
				text = message["content"]
				array_text = text.split()
				for word in array_text:
					print(word)
					if word not in wordDict:
						print('word is none')
						wordDict[word] = 0
					wordDict[word] += 1
			except:
				print('')
		print(wordDict)
		for k, v in wordDict.items():
			if k in stop_words :
				wordDict[k] = 0
		

		sorted_x = sorted(wordDict.items(), key=operator.itemgetter(1))
		sorted_x.reverse()
		for thing, value in  sorted_x:
			print("%s : %s" % (thing, value))

	
		